export type Params = {
  title: string;
  published: boolean;
};

async function validate(params: Partial<Params>): Promise<boolean> {
  if (!("title" in params) || !("published" in params)) {
    return false;
  }

  const { title, published } = params;

  return typeof title === "string" && !!title && typeof published === "boolean";
}

export const postValidator = {
  validate,
};
