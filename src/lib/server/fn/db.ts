import { fail } from "@sveltejs/kit";
import prisma from "../prisma";

// this is good but consider separating out into different files
// also, use prettier

export const deleteUser = async (email: string) => {
  const response = await prisma.user.delete({
    where: {
      username: email,
    },
  });
  return response;
};

export const deletePost = async (id: number) => {
  const response = await prisma.post.delete({
    where: {
      id,
    },
  });
  return response;
};

export const deleteManyPost = async (email: string) => {
  const authorID = await prisma.user.findFirst({
    where: { username: email },
    select: {
      id: true,
    },
  });
  const response = await prisma.post.deleteMany({
    where: {
      authorId: authorID?.id,
    },
  });
  return response;
};

export const deleteSession = async (email: string) => {
  const id = await prisma.user.findFirst({
    where: { username: email },
    select: {
      id: true,
    },
  });
  if (id === null) {
    return fail(404, { message: "NO SESSION" });
  }
  const response = await prisma.post.delete({
    where: {
      id: +id.id,
    },
  });
  return response;
};

export const updatePost = async (id: number, title: string, content: string) => {
  const response = await prisma.post.update({
    where: { id, },
    data: {
      title,
      content,
    },
  })
  return response;
};