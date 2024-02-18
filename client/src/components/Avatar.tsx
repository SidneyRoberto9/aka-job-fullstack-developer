import React from 'react';

interface AvatarProps {
  name: string;
  email: string;
}

export function Avatar({ name, email }: AvatarProps) {
  return (
    <div className="flex items-center p-4 select-none">
      <div className="rounded-full w-12 h-12 bg-black dark:bg-slate-100 flex items-center justify-center border dark:border-slate-100  border-black">
        <span className="text-white dark:text-black text-xl font-bold">
          {name.charAt(0).toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col ml-2 select-none">
        <h1 className="text-lg"> {name}</h1>
        <h5 className="text-sm opacity-40 -mt-1">{email}</h5>
      </div>
    </div>
  );
}
