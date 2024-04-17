import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { lucia } from "$lib/server/auth";

export const actions = {
  default: async (event) => {
    const { locals, cookies } = event;
    if (!locals.session) {
      error(401, "No session");
    }
    await lucia.invalidateSession(locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: "/",
      ...sessionCookie.attributes,
    });
    redirect(303, "/");
  },
} satisfies Actions;
