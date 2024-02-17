import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { api } from '@/lib/axios';
import { SchemaRegisterForm } from '@/components/forms/registerForm';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

export async function SignUpRequest(data: SchemaRegisterForm) {
  const response = await api.post('/users', data);

  return response;
}

export async function isAuthenticateRedirect() {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect('/home');
  }
}

export async function isNotAuthenticateRedirect() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/');
  }
}
