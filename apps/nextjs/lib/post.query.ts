import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma/client";

async function fetchMany(
  { after, take = 10 }: { take?: number; after?: string },
) {
  const select: Prisma.PostSelect = {
    id: true,
    title: true,
    updatedAt: true,
  };
  const where: Prisma.PostWhereInput = {
    published: true,
  };
  const orderBy: Prisma.PostOrderByWithRelationInput = {
    updatedAt: "desc",
  };

  const args: Prisma.PostFindManyArgs = after
    ? {
      select,
      where,
      orderBy,
      take,
      skip: 1,
      cursor: {
        id: after,
      },
    }
    : {
      select,
      where,
      orderBy,
      take,
    };

  const posts = await prisma.post.findMany(args);
  return posts.map((post) => ({
    ...post,
    updatedAt: post.updatedAt.toLocaleString(),
  }));
}

async function fetchOne(
  { id, onlyPublished = true }: { id: string; onlyPublished?: boolean },
) {
  const where: Prisma.PostWhereInput = onlyPublished
    ? {
      id,
      published: true,
    }
    : {
      id,
    };

  const post = await prisma.post.findFirst({
    where,
  });
  if (!post) {
    return null;
  }

  return ({
    ...post,
    createdAt: post.createdAt.toLocaleString(),
    updatedAt: post.updatedAt.toLocaleString(),
  });
}

export const postQuery = {
  fetchMany,
  fetchOne,
};
