import { faker } from "@faker-js/faker";
import { sleep } from "@/lib/timer.helper.js";
import { prisma } from "./client.js";

function seedPost({ published }: { published: boolean }) {
  return {
    published,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
  };
}

async function main() {
  for (let i = 0; i < 10; i++) {
    await prisma.post.create({
      data: seedPost({ published: i % 3 !== 0 }),
    });

    // For list order
    await sleep(10);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
