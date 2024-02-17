import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { makeFetchExchangeRateUseCase } from '@/use-cases/factories/make-fetch-exchange-rate-use-case';

const listQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  date: z.string().optional(),
});

export async function list(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('GET /exchange-rate');

  const { page, date } = listQuerySchema.parse(request.query);

  const fetchExchangeRateUseCase = makeFetchExchangeRateUseCase();

  const response = await fetchExchangeRateUseCase.execute({
    page,
    date,
  });

  reply.status(200).send(response);
}
