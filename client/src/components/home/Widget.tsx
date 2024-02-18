import React from 'react';

interface WidgetProps {
  name: string;
  value: number;
}

export function Widget({ name, value }: WidgetProps) {
  return (
    <div className="w-11/12 h-full rounded-lg shadow-md m-2 bg-white/30 select-none">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div>
          <span className="text-lg">{name}</span>
          <h1 className="text-5xl font-semibold">{value}</h1>
        </div>
      </div>
    </div>
  );
}
