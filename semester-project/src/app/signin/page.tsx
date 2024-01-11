"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();
  const email = useRef("");
  const password = useRef("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await signIn("credentials", {
        email: email.current,
        password: password.current,
        redirect: false,
      });
      if (res?.error) alert(res?.error);
      else router.push("/");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="bg-fixed bg-center bg-cover custom-img h-screen text-white">
      <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
        <Navbar />
      </div>
      <div className="max-w-2xl mx-auto flex flex-col justify-center px-2 py-10 lg:px-4 bg-black bg-opacity-70 rounded-xl mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={(e) => (email.current = e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-black pl-2 placeholder:text-gray-40"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => (password.current = e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-black pl-2 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center text-center bg-green-500 p-2 mt-10 rounded-xl hover:bg-green-600 tracking-wider"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="flex justify-center mt-10 text-center text-sm text-gray-300 gap-1">
            Not a member?
            <Link href="/signup">
              <p className="font-bold text-green-400 hover:text-green-500">
                Sign Up
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
