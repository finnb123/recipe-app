import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = (async (event) => {
  if (!event.locals.user) {
    return {
      logged_in: false,
    };
  }
  const {
    locals: { session },
  } = event;
  return { logged_in: true, session };
}) satisfies LayoutServerLoad;

// don't do authentication in pageloads unless you want to await parent everywhere
// do in hooks
// typing it as layout/pageserverload instead of saying it satisfies that interface
// is a way to avoid the parenthesis hell
