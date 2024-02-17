import { FastifyInstance } from 'fastify';
import axios, { AxiosError } from 'axios';

import { convertActualDateToLocale } from '@/util/convert-actual-date-to-locale';
import { ExternalFetchError } from '@/use-cases/errors/extrenal-fetch-error';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';
import { dayjsInstance } from '@/lib/dayjs';
import { FetchFromExternalApiResponse } from '@/@Types/external-api';

const exchangeRateApiUrl = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';

export class FetchAndSaveExchangeRateUseCase {
  constructor(private exchangeRateRepository: ExchangeRateRepository) {}

  async execute(app: FastifyInstance) {
    try {
      const now = dayjsInstance().tz('America/Sao_Paulo');
      const currentDay = now.day();

      const { hour, iso } = convertActualDateToLocale();

      if (currentDay === 0 || currentDay === 6) {
        app.log.info('The stock exchange is closed.');
        return;
      }

      if (hour < 9 || hour >= 17) {
        app.log.info('The stock exchange is closed.');
        return;
      }

      const { data } = await axios.get<FetchFromExternalApiResponse>(exchangeRateApiUrl);

      const valueAvgFromAskAndBid = (parseFloat(data.USDBRL.ask) + parseFloat(data.USDBRL.bid)) / 2;

      await this.exchangeRateRepository.save({
        ask: parseFloat(data.USDBRL.ask),
        bid: parseFloat(data.USDBRL.bid),
        high: parseFloat(data.USDBRL.high),
        low: parseFloat(data.USDBRL.low),
        value: Number(valueAvgFromAskAndBid.toFixed(4)),
        created_at: iso,
        updated_at: iso,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ExternalFetchError();
      }
    }
  }
}
