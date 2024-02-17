import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';
import axios, { AxiosError } from 'axios';

import { ExternalFetchError } from '@/use-cases/errors/extrenal-fetch-error';
import { ExchangeRateRepository } from '@/repositories/exchange-rate-repository';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface FetchFromExternalApiResponse {
  USDBRL: IExchangeData;
}

export interface IExchangeData {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: Date;
}

const exchangeRateApiUrl = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';

export class FetchAndSaveExchangeRateUseCase {
  constructor(private exchangeRateRepository: ExchangeRateRepository) {}

  async execute() {
    try {
      const now = dayjs().tz('America/Sao_Paulo');
      const currentHour = now.hour();
      const currentDay = now.day();

      if (currentDay === 0 || currentDay === 6) {
        console.log('O mercado está fechado.');
        return;
      }
      if (currentHour < 9 || currentHour >= 17) {
        console.log('O mercado está fechado.');
        return;
      }

      const { data } = await axios.get<FetchFromExternalApiResponse>(exchangeRateApiUrl);

      const valueAvgFromAskAndBid =
        (parseFloat(data.USDBRL.high) + parseFloat(data.USDBRL.low)) / 2;

      await this.exchangeRateRepository.save({
        ask: parseFloat(data.USDBRL.ask),
        bid: parseFloat(data.USDBRL.bid),
        high: parseFloat(data.USDBRL.high),
        low: parseFloat(data.USDBRL.low),
        value: Number(valueAvgFromAskAndBid.toFixed(4)),
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ExternalFetchError();
      }
    }
  }
}
