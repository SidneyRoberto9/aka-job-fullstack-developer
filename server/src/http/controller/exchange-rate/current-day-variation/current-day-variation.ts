import { FastifyRequest, FastifyReply } from 'fastify';

import { makeGetVariationExchangeRateUseCase } from '@/use-cases/factories/make-get-variation-in-current-day-use-case';
import { NotFoundError } from '@/use-cases/errors/not-found-error';

export async function currentDayVariation(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('GET /exchange-rate/variation');

  try {
    const getVariationInCurrentDayUseCase = makeGetVariationExchangeRateUseCase();

    const data = await getVariationInCurrentDayUseCase.execute();

    return reply.status(200).send({ data });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
