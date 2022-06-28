import { start } from "node:repl";
import { prisma } from "../prisma/client";

async function main() {
  const server = start();
  server.context.prisma = prisma;

  server.on("exit", async () => {
    await prisma.$disconnect();
  });
}

main()
  .catch(console.error);
