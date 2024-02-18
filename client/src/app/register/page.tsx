import Link from 'next/link';

import { RegisterForm } from '@/components/forms/registerForm';

export default function Page() {
  return (
    <article className="flex items-center justify-center flex-col gap-6 max-w-72 w-72 md:w-96 md:max-w-96">
      <section className="text-center flex flex-col gap-2">
        <h1 className="font-semibold text-2xl">Sign Up</h1>
        <p className="text-sm opacity-45">Join our community today</p>
      </section>

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
