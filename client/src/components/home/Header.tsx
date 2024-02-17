import React from 'react';
import { useSession } from 'next-auth/react';

import { SignOutButton } from '@/components/SignOutButton';
import { Avatar } from '@/components/Avatar';
import { IUser } from '@/@Types/user';

interface HeaderProps {
  user: IUser;
}

export async function Header({ user }: HeaderProps) {
  return (
    <div className="flex w-full overflow-hidden">
      <Avatar name={user.name} email={user.email} />

      <div className="flex items-center justify-end w-full p-4">
        <SignOutButton />
      </div>
    </div>
  );
}
