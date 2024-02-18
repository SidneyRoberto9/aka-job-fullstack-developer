import { Fragment } from 'react';
import { getServerSession } from 'next-auth';

import { FetchExchangeRateVariation } from '@/server/fetch-exchange-rate-variation';
import { FetchExchangeRateInfo } from '@/server/fetch-exchange-rate-info';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Widget } from '@/components/home/Widget';
import { DataTable } from '@/components/home/Table';
import { Header } from '@/components/home/Header';
import { Chart } from '@/components/home/Chart';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { ICurrency } from '@/@Types/exchange-rate';

export const revalidate = 300;

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return null;
  }

  let currency = searchParams?.currency as ICurrency;
  currency = currency == undefined ? 'USD' : currency;

  const exchangeRateVariation = await FetchExchangeRateVariation(session.token, currency);
  const exchangeRateInfo = await FetchExchangeRateInfo(session.token, currency);

  return (
    <article className="w-full max-w-7xl overflow-hidden">
      <section className="w-full">
        <Header user={session?.user} />
        <hr className="border-b border-black dark:border-white opacity-10 w-full m-2" />
      </section>

      {exchangeRateInfo && exchangeRateVariation ? (
        <Fragment>
          <section className="flex flex-col sm:flex-row">
            {exchangeRateVariation && <Chart variation={exchangeRateVariation} />}
            {exchangeRateInfo && (
              <div className="w-full flex flex-col sm:w-1/4">
                <Widget
                  name="Average"
                  value={exchangeRateInfo.avg.toFixed(4)}
                  currency={currency}
                />
                <Widget name="Max" value={exchangeRateInfo.max.toFixed(4)} currency={currency} />
                <Widget name="Min" value={exchangeRateInfo.min.toFixed(4)} currency={currency} />
              </div>
            )}
          </section>

          <section className="w-full my-2">
            <DataTable token={session.token} currency={currency} />
          </section>
        </Fragment>
      ) : (
        <section className="h-fit">
          <LoadingSpinner />
        </section>
      )}

      <section className="w-full select-none">
        <span className="flex items-center justify-center m-4">
          {`© ${new Date().getFullYear()} Sidney Roberto`}
        </span>
      </section>
    </article>
  );
}
