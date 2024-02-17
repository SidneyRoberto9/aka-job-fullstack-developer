import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { makeSessionUseCase } from '@/use-cases/factories/make-session-use-case';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function session(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const sessionUseCase = makeSessionUseCase();

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
