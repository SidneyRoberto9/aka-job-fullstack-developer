import { AxiosError } from 'axios';

import { api } from '@/lib/axios';
import { ExchangeRate } from '@/@Types/exchange-rate';

export async function LoadExchangeRateVariation(token: string): Promise<ExchangeRate[] | null> {
  try {
    const { data } = await api.get('/exchange-rate/variation', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data.exchangeRate;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    }
  }

  return null;
}

export async function LoadExchangeRateInfo(token: string): Promise<ExchangeRate | null> {
  try {
    const { data } = await api.get('/exchange-rate/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    }
  }

  return null;
}
