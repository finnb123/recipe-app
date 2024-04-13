import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";

export const load = async (event) => {
  // don't auth
  if (!event.locals.user) redirect(302, "/auth/signin");

  // prefer constants, extract this to a function
  // as a whole, only use mutable values
  // when you actually have to mutate them
  // this is a good practice to follow and you won't
  // mutate values as often as you think
  let posts = await prisma.post.findMany({
    where: { authorId: event.locals.user?.id },
  });
  return {
    username: event.locals.user?.username,
    posts,
  };
};

// do this in hooks.server.ts
// pageloads aren't guaranteed to run every time you go to a page
