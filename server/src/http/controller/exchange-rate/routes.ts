import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middleware/verify-jwt';
import { listDocs } from '@/http/controller/exchange-rate/list/list.docs';
import { list } from '@/http/controller/exchange-rate/list/list';
import { infoDocs } from '@/http/controller/exchange-rate/info/info.docs';
import { info } from '@/http/controller/exchange-rate/info/info';
import { currentDayVariationDocs } from '@/http/controller/exchange-rate/current-day-variation/current-day-variation.docs';
import { currentDayVariation } from '@/http/controller/exchange-rate/current-day-variation/current-day-variation';

export async function exchangeRateRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post('/exchange-rate', listDocs, list);
  app.get('/exchange-rate/info', infoDocs, info);
  app.get('/exchange-rate/variation', currentDayVariationDocs, currentDayVariation);
}
