import { fail, error, redirect } from "@sveltejs/kit";
import { z } from "zod";
import prisma from "$lib/server/prisma";
import { updatePost } from "$lib/server/fn/db";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ params: { id }, locals }) => {
  if (!locals.user) {
    redirect(303, "/auth/login");
  }
  const userId = locals.user.id;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });
  if (!post) error(404, "Post not found");
  return { post, userId };
}) satisfies PageServerLoad;

export const actions = {
  publishPost: async ({ params: { id } }) => {
    await prisma.post.update({
      where: { id: parseInt(id, 10) },
      data: {
        published: true,
      },
    });
    throw redirect(303, `/p/${id}`);
  },
  deletePost: async ({ params: { id } }) => {
    await prisma.post.delete({
      where: { id: parseInt(id, 10) },
    });
    throw redirect(303, "/");
  },
  updatePost: async ({ params: { id }, request, locals }) => {
    if (!locals.user) {
      return fail(401, { msg: "No user" });
    }
    const formData = await request.formData();
    const object = Object.fromEntries(formData.entries());
    const Schema = z.object({
      title: z.string(),
      content: z.string(),
    });
    const { success, error: issue, data } = Schema.safeParse(object);

    if (!success) {
      return fail(422, { msg: issue.message });
    }
    const { title, content } = data;

    await updatePost(parseInt(id, 10), title, content);
    throw redirect(303, `/p/${id}`);
  },
} satisfies Actions;
