'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LogIn } from 'lucide-react';

import { TooltipTrigger, TooltipProvider, TooltipContent, Tooltip } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: '/' });
    router.push('/');
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="default" className="px-3 text-center" onClick={() => handleSignOut()}>
            <LogIn size={25} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Sign Out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
