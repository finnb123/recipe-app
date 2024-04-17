import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { Prisma } from "@prisma/client";
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
      passwordTwo: z.string().min(6).max(255),
    });
    const { success, error, data } = Schema.safeParse(object);

    if (!success) {
      return fail(422, { msg: error.message });
    }
    const { username, password, passwordTwo } = data;
    if (password !== passwordTwo) {
      return fail(400, { msg: "Passwords must match" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return fail(400, { msg: "Invalid Username" });
    }
    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);
    try {
      const user = await prisma.user.create({
        data: {
          id: userId,
          username: username.toLocaleLowerCase(),
          hashed_password: hashedPassword,
        },
      });
      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    } catch (e) {
      // technically this works, but it isn't the right way to do this
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return fail(400, { message: "Email in use!" });
      }
      return fail(400, { message: "Prisma Error" });
    }
    return redirect(302, "/");
  },
};
