'use client';
import CountUp from 'react-countup';
import React from 'react';

interface WidgetProps {
  name: string;
  value: string;
}

export function Widget({ name, value }: WidgetProps) {
  return (
    <div className="w-[95%] h-32 sm:h-full rounded-lg shadow-md m-2 bg-white/30 dark:bg-slate-100/30 select-none text-black dark:text-slate-100">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div>
          <span className="text-lg">{name}</span>
          <h1 className="text-5xl font-semibold">
            <CountUp
              end={Number(value)}
              delay={0.25}
              duration={2}
              separator=""
              decimal=","
              decimals={4}
            />
          </h1>
        </div>
      </div>
    </div>
  );
}
