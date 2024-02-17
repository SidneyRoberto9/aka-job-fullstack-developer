import { FastifyRequest, FastifyReply } from 'fastify';

import { makeGetInfoExchangeRateUseCase } from '@/use-cases/factories/make-get-info-use-case';
import { NotFoundError } from '@/use-cases/errors/not-found-error';

export async function info(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getInfoExchangeRateUseCase = makeGetInfoExchangeRateUseCase();

    const data = await getInfoExchangeRateUseCase.execute();

    return reply.status(200).send({ data });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
