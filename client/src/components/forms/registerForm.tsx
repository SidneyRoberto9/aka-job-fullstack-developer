'use client';

import { z, set } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpRequest } from '@/server/auth';
import { PasswordInput } from '@/components/PasswordInput';
import { FormField } from '@/components/FormField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((password) => /\d/.test(password), {
      message: 'Password must contain at least one number',
    })
    .refine((password) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password), {
      message: 'Password must contain at least one special character',
    }),
});

export type SchemaRegisterForm = z.infer<typeof schema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SchemaRegisterForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SchemaRegisterForm) => {
    setIsLoading(true);
    try {
      await SignUpRequest(data);

      toast.success('Successfully Registered', {
        position: 'bottom-center',
        dismissible: true,
      });

      setIsLoading(false);
      router.push('/');
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        setValue('password', '');
        toast.error(error.response?.data.message, {
          position: 'bottom-center',
          dismissible: true,
        });
        return;
      }

      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-center gap-4"
    >
      <div className="w-full">
        <FormField errorName={errors.name} errorMessage={errors.name?.message}>
          <Input type="name" placeholder="Name" {...register('name')} />
        </FormField>

        <FormField errorName={errors.email} errorMessage={errors.email?.message}>
          <Input type="email" placeholder="Email" {...register('email')} />
        </FormField>

        <FormField errorName={errors.password} errorMessage={errors.password?.message}>
          <PasswordInput type="password" placeholder="Password" {...register('password')} />
        </FormField>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="text-center w-full bg-black text-xl font-extralight dark:bg-slate-100 dark:hover:bg-slate-100/50"
      >
        Sign Up
      </Button>
    </form>
  );
}
