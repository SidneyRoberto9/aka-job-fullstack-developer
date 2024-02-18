import { randomUUID } from 'node:crypto';

import { User, Prisma } from '@prisma/client';
import { UsersRepository } from '@/repositories/users-repository';

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = [];

  async save(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id);
    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
