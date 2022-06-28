const PORT = Number(process.env.NEXT_PUBLIC_PORT || "3000");

export const config = {
  app: {
    name: `Blog App`,
  },
  port: PORT,
  host: `http://localhost:${PORT}`,
};
