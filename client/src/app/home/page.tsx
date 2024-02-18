import { Fragment } from 'react';
import { getServerSession } from 'next-auth';

import { LoadExchangeRateVariation, LoadExchangeRateInfo } from '@/server/exchange-rate';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Widget } from '@/components/home/Widget';
import { DataTable } from '@/components/home/Table';
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
        <hr className="border-b border-black dark:border-white opacity-10 w-full m-2" />
      </section>

      {exchangeRateInfo && exchangeRateVariation ? (
        <Fragment>
          <section className="flex flex-col sm:flex-row">
            {exchangeRateVariation && <Chart variation={exchangeRateVariation} />}
            {exchangeRateInfo && (
              <div className="w-full flex flex-col sm:w-1/4">
                <Widget name="Average" value={exchangeRateInfo.avg.toFixed(4)} />
                <Widget name="Max" value={exchangeRateInfo.max.toFixed(4)} />
                <Widget name="Min" value={exchangeRateInfo.min.toFixed(4)} />
              </div>
            )}
          </section>

          <section className="w-full my-2">
            <DataTable token={session.token} />
          </section>
        </Fragment>
      ) : (
        <LoadingSpinner />
      )}

      <section className="w-full select-none">
        <span className="flex items-center justify-center m-4">
          {`© ${new Date().getFullYear()} Sidney Roberto`}{' '}
        </span>
      </section>
    </article>
  );
}
