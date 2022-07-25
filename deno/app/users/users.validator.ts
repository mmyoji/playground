import { User } from "./users.interface.ts";
import { UsersRepository } from "./users.repository.ts";

const repository = new UsersRepository();

export async function validate(
  args: Partial<Omit<User, "id">>,
): Promise<string> {
  if (!args.name || typeof args.name !== "string") {
    return "[name] must exists or be string.";
  }

  const { name } = args;

  const result = await repository.exists({ name });
  if (result) {
    return "[name] has already been taken.";
  }

  return "";
}
