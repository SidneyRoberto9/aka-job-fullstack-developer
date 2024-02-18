import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { makeGetInfoExchangeRateUseCase } from '@/use-cases/factories/make-get-info-use-case';
import { NotFoundError } from '@/use-cases/errors/not-found-error';

const infoQuerySchema = z.object({
  currency: z.enum(['USD', 'EUR', 'JPY']).optional().default('USD'),
});

export async function info(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('GET /exchange-rate/info');

  try {
    const { currency } = infoQuerySchema.parse(request.query);

    const getInfoExchangeRateUseCase = makeGetInfoExchangeRateUseCase();

    const data = await getInfoExchangeRateUseCase.execute({
      currency,
    });

    return reply.status(200).send({ data });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
