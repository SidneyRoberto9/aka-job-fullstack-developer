import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { makeFetchExchangeRateUseCase } from '@/use-cases/factories/make-fetch-exchange-rate-use-case';
import { ICurrency } from '@/@Types/currency';

const listBodySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  currency: z.enum(['USD', 'EUR', 'JPY']).optional().default('USD'),
  to: z.string().optional(),
  from: z.string().optional(),
});

export async function list(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('POST /exchange-rate');

  const { currency, page, to, from } = listBodySchema.parse(request.body);

  const fetchExchangeRateUseCase = makeFetchExchangeRateUseCase();

  const response = await fetchExchangeRateUseCase.execute({
    currency,
    page,
    to,
    from,
  });

  reply.status(200).send(response);
}
