import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { UserWithoutPassword, toUserWithoutPassword } from '@/use-cases/dto/user-without-password';
import { UsersRepository } from '@/repositories/users-repository';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: UserWithoutPassword;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError();
    }

    return { user: toUserWithoutPassword(user) };
  }
}
