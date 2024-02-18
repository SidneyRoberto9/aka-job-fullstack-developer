import { AxiosError } from 'axios';

import { api } from '@/lib/axios';
import { ICurrency, ExchangeRateInfo } from '@/@Types/exchange-rate';

export async function FetchExchangeRateInfo(
  token: string,
  currency: ICurrency,
): Promise<ExchangeRateInfo | null> {
  try {
    const { data } = await api.get(`/exchange-rate/info?currency=${currency}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data as ExchangeRateInfo;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    }

    return null;
  }
}
