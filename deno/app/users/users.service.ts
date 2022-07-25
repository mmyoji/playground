import { User } from "./users.interface.ts";
import { UsersRepository } from "./users.repository.ts";
import { validate } from "./users.validator.ts";

type CreateArgs = Pick<User, "name">;

export class UsersService {
  #repository: UsersRepository;

  constructor() {
    this.#repository = new UsersRepository();
  }

  async create(
    args: Partial<CreateArgs>,
  ): Promise<{ user: null; error: string } | { user: User; error: null }> {
    const error = await validate(args);
    if (error) {
      return { error, user: null };
    }

    const user = await this.#repository.create(args as CreateArgs);
    return { error: null, user };
  }
}
