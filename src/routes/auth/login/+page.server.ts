import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { Argon2id } from "oslo/password";
import prisma from "$lib/server/prisma.js";
import { lucia } from "$lib/server/auth.js";

export const actions = {
  default: async (event) => {
    const { request } = event;
    const formData = await request.formData();
    const object = Object.fromEntries(formData.entries());
    const Schema = z.object({
      username: z.string().min(3).max(31),
      password: z.string().min(6).max(255),
    });
    const { success, error, data } = Schema.safeParse(object);

    if (!success) {
      return fail(422, { msg: error.message });
    }
    const { username, password } = data;
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (!existingUser) {
      return fail(400, { msg: "Bad" });
    }
    const validPassword = await new Argon2id().verify(existingUser.hashed_password, password);
    if (!validPassword) {
      return fail(400, { msg: "Bad" });
    }
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    // i think lucia has some sort of cookie serialisation utility
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
    return redirect(302, "/");
  },
};
