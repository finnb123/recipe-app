import type { Handle } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
  // extract this to a function, its a lot
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null; // eslint-disable-line no-param-reassign
    event.locals.session = null; // eslint-disable-line no-param-reassign
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: "/",
      ...sessionCookie.attributes,
    });
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: "/",
      ...sessionCookie.attributes,
    });
  }
  event.locals.user = user; // eslint-disable-line no-param-reassign
  event.locals.session = session; // eslint-disable-line no-param-reassign

  return resolve(event);
};
