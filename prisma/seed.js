// prisma/seed.ts

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// let data = [
//     {
//         "id": 1,
//         "author": {
//             "name": "Brendan",
//             "email": "brendan@gmail.com",
//             "password": "admin"
//         },
//         "title": "Spagbol",
//         "content": "Boil spag, pour bol onto spag",
//         "published": true
//     },
// ];

// async function main() {

//   console.log(`Start seeding ...`)

//   for (const p of data) {

//     const user = await prisma.user.create({

//       data: {

//         name: p.author.name,

//         email: p.author.email,

//         password: p.author.password,

//         posts: {

//           create: {

//             title: p.title,

//             content: p.content,

//             published: p.published,

//           },

//         },

//       }

//     })

//     console.log(`Created user with id: ${user.id}`)

//   }

//   console.log(`Seeding finished.`)

// }

// main()

//   .then(async () => {

//     await prisma.$disconnect()

//   })

//   .catch(async (e) => {

//     console.error(e)

//     await prisma.$disconnect()

//     process.exit(1)

//   })
