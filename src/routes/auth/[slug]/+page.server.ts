// import { fail, redirect, error } from "@sveltejs/kit";
// import { Prisma } from "@prisma/client";
// import { generateId } from "lucia";
// import { Argon2id } from "oslo/password";
// import { lucia } from "$lib/server/auth";
// import { deleteManyPost, deleteUser } from "$lib/server/db";
// import type { PageServerLoad, Actions } from "./$types";
// import prisma from "$lib/server/prisma";

// export const load = (async ({ params: { slug } }) => {
//   let title: string = "";
//   // please no
//   if (slug === "signin") {
//     title = "Sign In";
//   } else if (slug === "signup") {
//     title = "Sign Up";
//   } else if (slug === "signout") {
//     title = "Log Out";
//   } else if (slug === "delete_account") {
//     title = "Delete Account";
//   } else {
//     error(404, "Not Found");
//   }
//   return { slug, title };
// }) satisfies PageServerLoad;

// export const actions = {
//   signin: async (event) => {
//     const formData = await event.request.formData();
//     // prefer using something like zod for form validation
//     const username = formData.get("username");
//     const password = formData.get("password");
//     if (typeof username !== "string" || username.length < 3 || username.length > 31) {
//       return fail(400, { username, bad: true });
//     }

//     if (typeof password !== "string" || password.length < 6 || password.length > 255) {
//       return fail(400, { username, bad: true });
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: { username: username.toLocaleLowerCase() },
//     });
//     if (!existingUser) {
//       return fail(400, { username, bad: true });
//     }

//     const validPassword = await new Argon2id().verify(existingUser.hashed_password, password);
//     if (!validPassword) {
//       return fail(400, { username, bad: true });
//     }

//     const session = await lucia.createSession(existingUser.id, {});
//     const sessionCookie = lucia.createSessionCookie(session.id);
//     // i think lucia has some sort of cookie serialisation utility
//     event.cookies.set(sessionCookie.name, sessionCookie.value, {
//       path: ".",
//       ...sessionCookie.attributes,
//     });
//     redirect(302, "/");
//   },
//   signup: async (event) => {
//     const formData = await event.request.formData();
//     const username = formData.get("username");
//     const password = formData.get("password");
//     const passwordTwo = formData.get("passwordTwo");
//     if (typeof username !== "string" || username.length < 3 || username.length > 31) {
//       return fail(400, { message: "Invalid username" });
//     }

//     if (typeof password !== "string" || password.length < 6 || password.length > 255) {
//       return fail(400, { message: "Invalid password" });
//     }
//     if (password !== passwordTwo) {
//       return fail(400, { message: "Passwords must match!" });
//     }
//     const userId = generateId(15);
//     const hashedPassword = await new Argon2id().hash(password);
//     try {
//       const user = await prisma.user.create({
//         data: {
//           id: userId,
//           username: username.toLocaleLowerCase(),
//           hashed_password: hashedPassword,
//         },
//       });
//       const session = await lucia.createSession(user.id, {});
//       const sessionCookie = lucia.createSessionCookie(session.id);
//       event.cookies.set(sessionCookie.name, sessionCookie.value, {
//         path: ".",
//         ...sessionCookie.attributes,
//       });
//     } catch (e) {
//       console.log(typeof e);
//       // technically this works, but it isn't the right way to do this
//       if (e instanceof Prisma.PrismaClientKnownRequestError) {
//         console.log(e.code);
//         return fail(400, { message: "Email in use!" });
//       }
//       return fail(400, { message: String(e) });
//     }
//     redirect(302, "/");
//   },
//   signout: async (event) => {
//     if (!event.locals.session) {
//       console.log("NO SESSION \n\n\n");
//       error(401, "No session");
//     }
//     await lucia.invalidateSession(event.locals.session.id);
//     const sessionCookie = lucia.createBlankSessionCookie();
//     event.cookies.set(sessionCookie.name, sessionCookie.value, {
//       path: ".",
//       ...sessionCookie.attributes,
//     });
//     redirect(303, "/");
//   },
//   delete_account: async (event) => {
//     if (!event.locals.session) {
//       console.log("NO SESSION\n\n\n");
//       error(401, "No session");
//     }
//     const formData = await event.request.formData();
//     const username = formData.get("username") as string;
//     const password = formData.get("password") as string;
//     const checkbox = formData.get("checkbox");
//     if (typeof username !== "string" || username.length < 3 || username.length > 31) {
//       return fail(400, { username, bad: true });
//     }

//     if (typeof password !== "string" || password.length < 6 || password.length > 255) {
//       return fail(400, { username, bad: true });
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: { username: username.toLocaleLowerCase() },
//     });
//     if (!existingUser) {
//       return fail(400, { username, bad: true });
//     }

//     const validPassword = await new Argon2id().verify(existingUser.hashed_password, password);
//     if (!validPassword) {
//       return fail(400, { username, bad: true });
//     }

//     try {
//       if (checkbox) {
//         const responsePost = await deleteManyPost(username);
//         console.log(responsePost);
//       }
//       const responseUser = await deleteUser(username);
//       console.log(responseUser);
//     } catch (e) {
//       console.log(e);
//       fail(401, { message: e });
//     }
//     redirect(302, "/");
//   },
// } satisfies Actions;
