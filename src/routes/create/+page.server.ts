import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import prisma from "$lib/server/prisma";
import type { Actions, PageServerLoad } from "./$types";

export const actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) { return fail(401, { msg: "No user" }); }
    const { username } = locals.user;
   
    const formData = await request.formData();
    const object = Object.fromEntries(formData.entries());
    const Schema = z.object({
      title: z.string(),
      content: z.string(),
    });
    const { success, error, data } = Schema.safeParse(object);

    if (!success) { return fail(422, { msg: error.message }) }
    const { title, content } = data;

    

    // let title = data.get("title");
    // let content = data.get("content");
    // let authorEmail = userId;

    // if (!title || !content) {
    //   return fail(400, { content, title, missing: true });
    // }

    // if (typeof title != "string" || typeof content != "string") {
    //   return fail(400, { content, title, incorrect: true });
    // }

    await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { username } },
      },
    });

    redirect(303, "/drafts");
  },
} satisfies Actions;

export const load: PageServerLoad = (async (event) => {
  if (!event.locals.user) redirect(302, "/auth/login");
}) satisfies PageServerLoad;
