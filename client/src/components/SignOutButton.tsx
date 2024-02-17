'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: '/' });
    router.push('/');
  };

  return <Button onClick={() => handleSignOut()}>Sign Out</Button>;
}
