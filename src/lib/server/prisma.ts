import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

// you might want to avoid initialising prisma globally
// try to pass it through event locals or using some sort
// of caching mechanism with (preferrably) a singleton pattern
// using dependency injection
//
// in serverless functions, this will greately hamper
// performance, its better to init this only once you need it
