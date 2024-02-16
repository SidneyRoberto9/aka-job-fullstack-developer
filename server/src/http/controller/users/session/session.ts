import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { SessionUseCase } from '@/use-cases/cases/session/session';
import { PrismaUserRepository } from '@/repositories/prisma/users-prisma-repository';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function session(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUserRepository();
    const sessionUseCase = new SessionUseCase(userRepository);

    const { user } = await sessionUseCase.execute({
      email,
      password,
    });

    return reply.status(200).send({ user });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
