import { getServerSession } from 'next-auth';

import { LoadExchangeRateVariation, LoadExchangeRateInfo } from '@/server/exchange-rate';
import { Widget } from '@/components/home/Widget';
import { Header } from '@/components/home/Header';
import { Chart } from '@/components/home/Chart';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return null;
  }

  const exchangeRateVariation = await LoadExchangeRateVariation(session.token);
  const exchangeRateInfo = await LoadExchangeRateInfo(session.token);

  return (
    <article className="w-full max-w-7xl overflow-hidden">
      <section className="w-full">
        <Header user={session?.user} />
        <hr className="border-b border-black opacity-10 w-full m-2" />
      </section>

      <section className="flex">
        {exchangeRateVariation && <Chart variation={exchangeRateVariation} />}

        <div className="flex flex-row md:flex-col w-full md:w-1/4">
          <Widget name="Average" value={4.756} />
          <Widget name="Max" value={4.956} />
          <Widget name="Min" value={4.456} />
        </div>
      </section>
    </article>
  );
}
