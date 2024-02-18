import { it, expect, describe, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';

import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { GetUserProfileUseCase } from '@/use-cases/cases/get-user-profile/get-user-profile';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able get a User Profile', async () => {
    const createdUser = await usersRepository.save({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should be able a not find User', async () => {
    await expect(() =>
      sut.execute({
        userId: 'Invalid Id',
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
