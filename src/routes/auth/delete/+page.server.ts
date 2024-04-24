import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { Argon2id } from "oslo/password";
import { deleteManyPost, deleteUser } from "$lib/server/fn/db.js";
import prisma from "$lib/server/prisma.js";

export const actions = {
  default: async (event) => {
    const { locals, request } = event;
    if (!locals.session) {
      return fail(401, { msg: "No session" });
    }
    const formData = await request.formData();
    const object = Object.fromEntries(formData.entries());
    const Schema = z.object({
      username: z.string().min(3).max(31),
      password: z.string().min(6).max(255),
      checkbox: z.coerce.boolean(),
    });
    const { success, error, data } = Schema.safeParse(object);
    if (!success) {
      return fail(422, { msg: error.message });
    }
    const { username, password, checkbox } = data;
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
    try {
      if (checkbox) {
        await deleteManyPost(username);
      }
      await deleteUser(username);
    } catch (e) {
      return fail(401, { msg: "error deleting posts" });
    }
    return redirect(302, "/");
  },
};
