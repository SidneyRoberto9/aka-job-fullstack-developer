import { FcGoogle } from 'react-icons/fc';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface GoogleButtonProps {
  className?: string;
  text: string;
}

export function GoogleButton({ className, text }: GoogleButtonProps) {
  return (
    <Button variant="outline" className={cn('gap-3 w-full', className)}>
      <FcGoogle size={28} />
      {text}
    </Button>
  );
}
