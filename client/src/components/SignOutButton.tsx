'use client';
import { signOut } from 'next-auth/react';
import { LogIn } from 'lucide-react';

import { TooltipTrigger, TooltipProvider, TooltipContent, Tooltip } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={() => handleSignOut()}>
            <LogIn size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Sign Out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
