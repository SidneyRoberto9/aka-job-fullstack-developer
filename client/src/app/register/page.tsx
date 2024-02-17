import Link from 'next/link';

import { GoogleButton } from '@/components/GoogleButton';
import { RegisterForm } from '@/components/forms/registerForm';

export default function Page() {
  return (
    <article className="flex items-center justify-center flex-col gap-6 max-w-72 w-72 md:w-96 md:max-w-96">
      <section className="text-center flex flex-col gap-2">
        <h1 className="font-semibold text-2xl">Sign Up</h1>
        <p className="text-sm opacity-45">Your Social Campaigns</p>
      </section>

      <section className="w-full flex items-center justify-center">
        <GoogleButton text="Sign Up With Google" />
      </section>

      <div className="flex w-full items-center justify-center">
        <span className="border-b border-black opacity-10 w-1/3" />
        <p className="px-2 md:px-4 opacity-40 text-xs">Or with Email</p>
        <span className="border-b border-black opacity-10 w-1/3" />
      </div>

      <RegisterForm />

      <section className="flex item-center justify-center gap-2 ">
        <div>
          <span className="opacity-40">Already have an Account?</span>
          <Link
            href="/"
            className="text-indigo-300 mx-2 py-0 my-0 border-b border-transparent hover:border-b hover:border-indigo-300"
          >
            Sign In
          </Link>
        </div>
      </section>
    </article>
  );
}
