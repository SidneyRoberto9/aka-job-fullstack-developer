'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import React from 'react';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SchemaRegisterForm>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: SchemaRegisterForm) => {
    try {
      await SignUpRequest(data);

      toast.success('Successfully Registered', {
        position: 'bottom-center',
        dismissible: true,
      });

      router.push('/');
    } catch (error) {
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

        <div className="w-full h-16">
          <Input type="email" placeholder="Email" {...register('email')} />
          {errors.email && (
            <span className="text-red-500 text-xs p-0 px-2 m-0">{errors.email.message}</span>
          )}
        </div>

        <div className="w-full h-16">
          <PasswordInput type="password" placeholder="Password" {...register('password')} />
          {errors.password && (
            <span className="text-red-500 text-xs p-0 px-2 m-0">{errors.password.message}</span>
          )}
        </div>
      </div>

      <Button type="submit" className="text-center w-full bg-black text-xl font-extralight">
        Sign Up
      </Button>
    </form>
  );
}
