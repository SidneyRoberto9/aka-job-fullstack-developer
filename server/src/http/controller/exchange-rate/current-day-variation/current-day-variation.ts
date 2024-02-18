import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { makeGetVariationExchangeRateUseCase } from '@/use-cases/factories/make-get-variation-in-current-day-use-case';
import { NotFoundError } from '@/use-cases/errors/not-found-error';

const currentDayVariationQuerySchema = z.object({
  currency: z.enum(['USD', 'EUR', 'JPY']).optional().default('USD'),
});

export async function currentDayVariation(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('GET /exchange-rate/variation');

  try {
    const { currency } = currentDayVariationQuerySchema.parse(request.query);

    const getVariationInCurrentDayUseCase = makeGetVariationExchangeRateUseCase();

    const { exchangeRate } = await getVariationInCurrentDayUseCase.execute({
      currency,
    });

    return reply.status(200).send({ data: exchangeRate });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
