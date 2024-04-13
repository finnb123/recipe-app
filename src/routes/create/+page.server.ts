import prisma from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, RequestEvent, PageServerLoad } from "./$types";
import { lucia } from "$lib/server/auth";

//get zod
export const actions = {
  default: async ({ request, locals }) => {
    const data = await request.formData();
    if (!locals.user) {
      throw fail(401);
    }
    const userId = locals.user.username;
    console.log(userId);

    // prefer constants, try to make it
    // a habit to use them
    let title = data.get("title");
    let content = data.get("content");
    // let authorEmail = userId;

    if (!title || !content) {
      return fail(400, { content, title, missing: true });
    }

    if (typeof title != "string" || typeof content != "string") {
      return fail(400, { content, title, incorrect: true });
    }

    await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { username: userId } },
      },
    });

    throw redirect(303, "/drafts");
  },
} satisfies Actions;

export const load: PageServerLoad = (async (event) => {
  if (!event.locals.user) redirect(302, "/auth/signin");
}) satisfies PageServerLoad;
