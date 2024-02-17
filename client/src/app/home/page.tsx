import { getServerSession } from 'next-auth';

import { SignOutButton } from '@/components/SignOutButton';
import { Header } from '@/components/home/Header';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return null;
  }

  return (
    <article className="w-full max-w-7xl overflow-hidden">
      <Header user={session?.user} />
      <hr className="border-b border-black opacity-10 w-full m-2" />
    </article>
  );
}
