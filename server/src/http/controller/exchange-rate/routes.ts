import { FastifyInstance } from 'fastify';

import { info } from '@/http/controller/exchange-rate/info/info';
import { currentDayVariation } from '@/http/controller/exchange-rate/current-day-variation/current-day-variation';

export async function exchangeRateRoutes(app: FastifyInstance) {
  app.get('/exchange-rate/info', info);
  app.get('/exchange-rate/variation', currentDayVariation);
}
