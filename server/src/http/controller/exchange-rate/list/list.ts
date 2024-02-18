import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { makeFetchExchangeRateUseCase } from '@/use-cases/factories/make-fetch-exchange-rate-use-case';

const listBodySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  to: z.string().optional(),
  from: z.string().optional(),
});

export async function list(request: FastifyRequest, reply: FastifyReply) {
  request.log.info('POST /exchange-rate');

  const { page, to, from } = listBodySchema.parse(request.body);

  const fetchExchangeRateUseCase = makeFetchExchangeRateUseCase();

  const response = await fetchExchangeRateUseCase.execute({
    page,
    to,
    from,
  });

  reply.status(200).send(response);
}
