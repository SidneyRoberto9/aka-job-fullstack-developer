'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput } from '@/components/PasswordInput';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SchemaLoginForm = z.infer<typeof schema>;

export function LoginForm() {
  const { register, handleSubmit, setValue } = useForm<SchemaLoginForm>({
    resolver: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (formData: SchemaLoginForm) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      setIsLoading(false);
      toast.error('Invalid credentials. Please try again.', {
        position: 'bottom-center',
        dismissible: true,
      });
      setValue('password', '');
      return;
    }

    setIsLoading(false);
    toast.success('Logged in successfully', {
      position: 'bottom-center',
      dismissible: true,
      duration: 2000,
    });

    router.push('/home');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-center gap-4"
    >
      <div className="w-full">
        <div className="h-16 w-full">
          <Input type="email" placeholder="Email" {...register('email')} />
        </div>
        <div className="h-16 w-full">
          <PasswordInput type="password" placeholder="Password" {...register('password')} />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="text-center w-full bg-black text-xl font-extralight dark:bg-slate-100 dark:hover:bg-slate-100/50"
      >
        Sign In
      </Button>
    </form>
  );
}
