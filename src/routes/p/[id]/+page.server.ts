import { error, redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ params: { id }, locals }) => {
  if (!locals.user) {
    redirect(303, "/auth/signin");
  }
  const userId = locals.user.id;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });
  if (!post) error(404, "Post not found");
  return { post, userId };
}) satisfies PageServerLoad;
// auth again
// function again
// type again

export const actions = {
  publishPost: async ({ params: { id } }) => {
    await prisma.post.update({
      // avoid using Number() ctor
      // it can return bullshit and its
      // accepted practice to use parseInt()
      // or parseFloat() instead
      // to avoid NaNs, just check it with
      // the isNaN() function
      where: { id: Number(id) },
      data: {
        published: true,
      },
    });
    throw redirect(303, `/p/${id}`);
  },

  deletePost: async ({ params: { id } }) => {
    // same here, avoid using Number() ctor
    await prisma.post.delete({
      where: { id: Number(id) },
    });

    throw redirect(303, "/");
  },
} satisfies Actions;
