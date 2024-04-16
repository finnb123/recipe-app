import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import prisma from "$lib/server/prisma";
import type { Actions, PageServerLoad } from "./$types";

export const actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(401, { msg: "No user" });
    }
    const { username } = locals.user;

    const formData = await request.formData();
    const object = Object.fromEntries(formData.entries());
    const Schema = z.object({
      title: z.string(),
      content: z.string(),
    });
    const { success, error, data } = Schema.safeParse(object);

    if (!success) {
      return fail(422, { msg: error.message });
    }
    const { title, content } = data;

    await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { username } },
      },
    });

    return redirect(303, "/drafts");
  },
} satisfies Actions;

export const load: PageServerLoad = (async (event) => {
  if (!event.locals.user) redirect(302, "/auth/login");
}) satisfies PageServerLoad;
