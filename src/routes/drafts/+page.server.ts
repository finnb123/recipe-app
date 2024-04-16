import { redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";


export const load = (async (event) => {
  if (!event.locals.user) redirect(302, "/auth/signin");
  const userId = event.locals.user.id;
  const response = await prisma.post.findMany({
    where: { published: false, authorId: userId },
    include: { author: true },
  });
  return { drafts: response };
}) satisfies PageServerLoad;

// auth constants and functions again pls
