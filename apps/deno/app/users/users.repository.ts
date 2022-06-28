import { User } from "./users.interface.ts";

const USERS: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Chris" },
];

export class UsersRepository {
  getMany(): Promise<User[]> {
    return Promise.resolve(USERS);
  }

  getOne(id: User["id"]): User | null {
    const user = USERS.find((u) => u.id === id);
    if (user) {
      return user;
    }

    return null;
  }

  create({ name }: Pick<User, "name">): Promise<User> {
    const newUser: User = { id: USERS.length + 1, name };
    USERS.push(newUser);
    return Promise.resolve(newUser);
  }

  exists({ name }: Pick<User, "name">): Promise<boolean> {
    return Promise.resolve(!!USERS.find((u) => u.name === name));
  }
}
