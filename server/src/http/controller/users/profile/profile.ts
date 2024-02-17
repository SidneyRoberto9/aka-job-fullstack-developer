import { FastifyRequest, FastifyReply } from 'fastify';

import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('GET /me');

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();

    const { user } = await getUserProfileUseCase.execute({
      userId: request.user.sign.sub,
    });

    console.log(user);

    return reply.status(200).send({ user });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
