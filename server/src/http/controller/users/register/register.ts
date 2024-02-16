import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { RegisterUseCase } from '@/use-cases/cases/register/register';
import { PrismaUserRepository } from '@/repositories/prisma/users-prisma-repository';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUserRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
