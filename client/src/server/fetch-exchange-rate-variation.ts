import { AxiosError } from 'axios';

import { api } from '@/lib/axios';
import { ICurrency, ExchangeRate } from '@/@Types/exchange-rate';

export async function FetchExchangeRateVariation(
  token: string,
  currency: ICurrency,
): Promise<ExchangeRate[] | null> {
  try {
    const { data } = await api.get(`/exchange-rate/variation?currency=${currency}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data as ExchangeRate[];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    }

    return null;
  }
}
