import { User, Prisma } from '@prisma/client';

export interface UsersRepository {
  save(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
