import React from 'react';
import { useSession } from 'next-auth/react';

import { ThemeToggle } from '@/components/ThemeToggle';
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

      <div className="flex items-center justify-end gap-4 w-full p-4">
        <ThemeToggle />
        <SignOutButton />
      </div>
    </div>
  );
}
