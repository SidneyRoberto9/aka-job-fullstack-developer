import { GetUserProfileUseCase } from '@/use-cases/cases/get-user-profile/get-user-profile';
import { PrismaUserRepository } from '@/repositories/prisma/users-prisma-repository';

export function makeGetUserProfileUseCase() {
  const userRepository = new PrismaUserRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
  return getUserProfileUseCase;
}
