import fastifyCron from 'fastify-cron';
import fastify from 'fastify';

import { makeFetchAndSaveExchangeRateUseCase } from '@/use-cases/factories/make-fetch-and-save-exchange-rate-use-case';
import { usersRoutes } from '@/http/controller/users/routes';
import { exchangeRateRoutes } from '@/http/controller/exchange-rate/routes';

export const app = fastify();

app.register(fastifyCron, {
  jobs: [
    {
      cronTime: '*/1 * * * *',
      onTick: () => {
        const fetchAndSaveExchangeRateUseCase = makeFetchAndSaveExchangeRateUseCase();
        fetchAndSaveExchangeRateUseCase.execute();
      },
    },
  ],
});

app.register(usersRoutes);
app.register(exchangeRateRoutes);
