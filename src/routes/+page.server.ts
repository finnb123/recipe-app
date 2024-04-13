import prisma from "$lib/server/prisma";
import type { PageServerLoad, Actions } from "./$types";
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = (async (event) => {
  // should also be a function, you could probably
  // skip awaiting it here and do that in the template

  const response = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });

  return {
    feed: response,
  };
}) satisfies PageServerLoad;

// export const actions: Actions = {
//     // signout: async (event) => {
//     //     if (!event.locals.session) {
//     //         return fail(401)
//     //     }
//     //     await lucia.invalidateSession(event.locals.session.id);
//     //     const sessionCookie = lucia.createBlankSessionCookie();
//     //     event.cookies.set(sessionCookie.name, sessionCookie.value, {
//     //         path: ".",
//     //         ...sessionCookie.attributes
//     //     });
//     //     redirect(302, "/")
//     // },
//     // signin: async (event) => {redirect(302, "/auth/signin") }
// } satisfies Actions;
