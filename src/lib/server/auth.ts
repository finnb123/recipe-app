/* eslint arrow-body-style: 0 */
import { Lucia, TimeSpan } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";

// do not create a new client twice,
// your pooling config might fuck it in prod
//
// also, its just horrible to have 2 prisma clients
// because its a massive native binary that takes
// ages in an import, bad bad bad
export const client = new PrismaClient();
const adapter = new PrismaAdapter(client.session, client.user);

interface DatabaseUserAttributes {
  username: string;
  id: string;
}

// if you want only single export files
// be default, try to stay consistent
// with that pattern. knowing what
// to expect makes it much easier
// to write and maintain code.
export const lucia = new Lucia(adapter, {
  // thats short
  sessionExpiresIn: new TimeSpan(1, "h"),
  sessionCookie: {
    attributes: {
      // smart but also use import.meta.env.DEV
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      id: attributes.id,
    };
  },
});

// this should be in app.d.ts
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

// let clientCache = null;
// let adapterCache = null;
// let luciaCache = null;

// export const initialiseDbAndLucia = () => {
//   if (!clientCache) {
//     clientCache = new PrismaClient();
//   }
//   if (!adapterCache) {
//     adapterCache = new PrismaAdapter(clientCache.session, clientCache.user);
//   }
//   if (!luciaCache) {
//     luciaCache = new Lucia(adapterCache, {
//       // thats short
//       sessionExpiresIn: new TimeSpan(6, "h"),
//       sessionCookie: {
//         attributes: {
//           // smart but also use import.meta.env.DEV
//           secure: !dev,
//         },
//       },
//       getUserAttributes: (attributes) => {
//         return {
//           username: attributes.username,
//           id: attributes.id,
//         };
//       },
//     });
//   }
// const adapter = new PrismaAdapter(client.session, client.user)
// const lucia = new Lucia(adapter, {
//     // thats short
//     sessionExpiresIn: new TimeSpan(1, "h"),
//     sessionCookie: {
//         attributes: {
//             // smart but also use import.meta.env.DEV
//             secure: !dev
//         }
//     },
//     getUserAttributes: (attributes) => {
//         return {
//             username: attributes.username,
//             id: attributes.id
//         };
//     }
// });

//   return { client: clientCache, lucia: luciaCache };
// };
