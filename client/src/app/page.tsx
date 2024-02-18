import Link from 'next/link';

import { isAuthenticateRedirect } from '@/server/auth';
import { CenterBox } from '@/components/CenterBox';
import { LoginForm } from '@/components/forms/loginForm';

export default async function Page() {
  await isAuthenticateRedirect();

  return (
    <CenterBox>
      <article className="flex items-center justify-center flex-col gap-6 max-w-72 w-72 md:w-96 md:max-w-96 ">
        <section className="text-center flex flex-col gap-2">
          <h1 className="font-semibold text-2xl ">Sign In</h1>
          <p className="text-sm opacity-45">Your journey begins here</p>
        </section>

        <LoginForm />

        <section className="flex item-center justify-center gap-2 ">
          <div>
            <span className="opacity-40">Not a Member yet?</span>
            <Link
              href="/register"
              className="text-indigo-300 mx-2 py-0 my-0 border-b border-transparent hover:border-b hover:border-indigo-300"
            >
              Sign Up
            </Link>
          </div>
        </section>
      </article>
    </CenterBox>
  );
}
