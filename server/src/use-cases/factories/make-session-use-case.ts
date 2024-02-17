import { SessionUseCase } from '@/use-cases/cases/session/session';
import { PrismaUserRepository } from '@/repositories/prisma/users-prisma-repository';

export function makeSessionUseCase(): SessionUseCase {
  const userRepository = new PrismaUserRepository();
  const sessionUseCase = new SessionUseCase(userRepository);

  return sessionUseCase;
}
