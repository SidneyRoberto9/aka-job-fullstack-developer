'use client';
import { useState, forwardRef } from 'react';
import { EyeOffIcon, Eye } from 'lucide-react';

import { cn } from '@/lib/utils';
import { InputProps } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : type}
          className={cn(
            'flex h-10 w-full z-0 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute z-50 right-0 top-0 h-full p-4 cursor-pointer hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <Eye size={16} /> : <EyeOffIcon size={16} />}
        </Button>
      </div>
    );
  },
);
