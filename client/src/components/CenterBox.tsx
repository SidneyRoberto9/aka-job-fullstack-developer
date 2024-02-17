import React, { PropsWithChildren } from 'react';

export function CenterBox({ children }: PropsWithChildren) {
  return (
    <div className="h-screen flex items-center justify-center select-none">
      <div className="bg-white h-[656px] w-[340px] md:w-[680px] rounded-3xl">
        <div className="flex items-center justify-center h-full">{children}</div>
      </div>
    </div>
  );
}