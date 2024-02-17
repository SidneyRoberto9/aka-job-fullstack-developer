import { RegisterUseCase } from '@/use-cases/cases/register/register';
import { PrismaUserRepository } from '@/repositories/prisma/users-prisma-repository';

export function makeRegisterUseCase(): RegisterUseCase {
  const userRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUseCase(userRepository);

  return registerUseCase;
}
