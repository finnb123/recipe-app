import { redirect } from "@sveltejs/kit"
import prisma from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  // don't auth
  if (!event.locals.user) redirect(302, "/auth/login");
  const { id, username } = event.locals.user;
  // prefer constants, extract this to a function
  // as a whole, only use mutable values
  // when you actually have to mutate them
  // this is a good practice to follow and you won't
  // mutate values as often as you think
  const posts =  prisma.post.findMany({
    where: { authorId: id },
  });
  return {
    username,
    posts,
  };
};

// do this in hooks.server.ts
// pageloads aren't guaranteed to run every time you go to a page
