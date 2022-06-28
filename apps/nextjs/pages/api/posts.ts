import { NextApiHandler } from "next";
import { Params, postValidator } from "@/lib/post.validator";
import { prisma } from "@/prisma/client";

const handler: NextApiHandler<{ error?: string }> = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({});
    return;
  }

  const data = req.body as Params;
  const result = await postValidator.validate(data);
  if (!result) {
    res.status(422).json({ error: "Invalid request body." });
    return;
  }

  await prisma.post.create({ data });
  res.status(201).json({});
};

export default handler;
