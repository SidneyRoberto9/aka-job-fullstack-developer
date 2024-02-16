import { compare } from 'bcryptjs';

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { UserWithoutPassword, toUserWithoutPassword } from '@/use-cases/dto/user-without-password';
import { UsersRepository } from '@/repositories/users-repository';

interface SessionUseCaseRequest {
  email: string;
  password: string;
}

interface SessionUseCaseResponse {
  user: UserWithoutPassword;
}

export class SessionUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ email, password }: SessionUseCaseRequest): Promise<SessionUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    return { user: toUserWithoutPassword(user) };
  }
}
