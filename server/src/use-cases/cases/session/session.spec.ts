import { it, expect, describe, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { SessionUseCase } from '@/use-cases/cases/session/session';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUserRepository;
let sut: SessionUseCase;

describe('Session Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new SessionUseCase(usersRepository);
  });

  it('should be able to make session', async () => {
    await usersRepository.save({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should be able to make session with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should be able to make session with wrong password', async () => {
    await usersRepository.save({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
