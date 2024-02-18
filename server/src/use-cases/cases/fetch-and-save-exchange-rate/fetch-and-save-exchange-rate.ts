import { FastifyInstance } from 'fastify';
import dayjs from 'dayjs';
import axios, { AxiosError } from 'axios';

import { convertActualDateToLocale } from '@/util/convert-actual-date-to-locale';
import { ExternalFetchError } from '@/use-cases/errors/extrenal-fetch-error';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';
import { dayjsInstance } from '@/lib/dayjs';
import { FetchFromExternalApiResponse } from '@/@Types/external-api';

const exchangeRateApiUrl = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,JPY-BRL';

export class FetchAndSaveExchangeRateUseCase {
  constructor(private exchangeRateRepository: ExchangeRateRepository) {}

  async execute(app: FastifyInstance) {
    try {
      const now = dayjs();
      //disabled for populate the database
      /*
      const currentDay = now.day();
      const currentHour = now.hour();

      if (currentDay === 0 || currentDay === 6) {
        app.log.info('The stock exchange is closed.');
        return;
      }

      if (currentHour < 9 || currentHour >= 17) {
        app.log.info('The stock exchange is closed.');
        return;
      }
      */

      const { data } = await axios.get<FetchFromExternalApiResponse>(exchangeRateApiUrl);

      const USD = data.USDBRL;

      const valueAvgFromAskAndBidUSD = (parseFloat(USD.ask) + parseFloat(USD.bid)) / 2;

      await this.exchangeRateRepository.save({
        ask: parseFloat(USD.ask),
        bid: parseFloat(USD.bid),
        high: parseFloat(USD.high),
        low: parseFloat(USD.low),
        value: Number(valueAvgFromAskAndBidUSD.toFixed(4)),
        currency: 'USD',
      });

      const EUR = data.EURBRL;

      const valueAvgFromAskAndBidEUR = (parseFloat(EUR.ask) + parseFloat(EUR.bid)) / 2;

      await this.exchangeRateRepository.save({
        ask: parseFloat(EUR.ask),
        bid: parseFloat(EUR.bid),
        high: parseFloat(EUR.high),
        low: parseFloat(EUR.low),
        value: Number(valueAvgFromAskAndBidEUR.toFixed(4)),
        currency: 'EUR',
      });

      const JPY = data.JPYBRL;

      const valueAvgFromAskAndBidJPY = (parseFloat(JPY.ask) + parseFloat(JPY.bid)) / 2;

      await this.exchangeRateRepository.save({
        ask: parseFloat(JPY.ask),
        bid: parseFloat(JPY.bid),
        high: parseFloat(JPY.high),
        low: parseFloat(JPY.low),
        value: Number(valueAvgFromAskAndBidJPY.toFixed(4)),
        currency: 'JPY',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ExternalFetchError();
      }
    }
  }
}
