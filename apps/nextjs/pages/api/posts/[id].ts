import { NextApiHandler } from "next";
import { prisma } from "@/prisma/client";
import { Params, postValidator } from "@/lib/post.validator";

const handler: NextApiHandler<{ error?: string }> = async (
  req,
  res,
) => {
  if (req.method !== "PATCH") {
    res.status(404).json({});
    return;
  }

  const { id } = req.query as { id: string };
  if (typeof id !== "string") {
    res.status(404).json({ error: `Invalid [id]: ${id}` });
    return;
  }

  const data = req.body as Params;
  const result = await postValidator.validate(data);
  if (!result) {
    res.status(422).json({ error: "Invalid request body." });
    return;
  }

  await prisma.post.update({ where: { id }, data });
  res.status(204).json({});
};

export default handler;
