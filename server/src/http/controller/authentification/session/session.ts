import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { makeSessionUseCase } from '@/use-cases/factories/make-session-use-case';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function session(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('POST /session');

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const sessionUseCase = makeSessionUseCase();

    const { user } = await sessionUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign({
      sign: {
        sub: user.id,
      },
    });

    return reply.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
