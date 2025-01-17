import { it, expect, describe, beforeEach } from 'vitest';
import { compare } from 'bcryptjs';

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { RegisterUseCase } from '@/use-cases/cases/register/register';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
