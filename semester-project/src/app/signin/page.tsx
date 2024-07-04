"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Spinner from "@/components/icons/Spinner";
import { toast } from "react-toastify";
import EyeOff from "@/components/icons/EyeOff";
import Eye from "@/components/icons/Eye";

type Credentials = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState("password");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });
      setLoading(false);
      if (res?.error) toast.error(res?.error);
      else {
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handlePasswordVisibility = () => {
    type === "password" ? setType("text") : setType("password");
  };

  return (
    <div className="text-white">
      <div className="max-w-full sm:max-w-md md:max-w-xl mx-6 sm:mx-auto flex flex-col justify-center px-2 py-10 lg:px-4 bg-bv-blue-dark rounded-xl mt-20">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 mx-auto w-full max-w-[16rem] sm:max-w-xs md:max-w-sm">
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
                  onChange={(e) =>
                    setCredentials((prevData: Credentials) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
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
              <div className="mt-2 flex bg-white rounded-md">
                <input
                  id="password"
                  name="password"
                  type={type}
                  required
                  onChange={(e) =>
                    setCredentials((prevData: Credentials) => ({
                      ...prevData,
                      password: e.target.value,
                    }))
                  }
                  className="block rounded-l-md w-full border-0 py-1.5 text-black pl-2 placeholder:text-gray-400"
                />
                <span
                  className="bg-white rounded-r-md w-10 text-black p-1 flex justify-center items-center"
                  onClick={handlePasswordVisibility}
                >
                  {type === "password" ? <EyeOff /> : <Eye />}
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center text-center bg-bv-green-light p-2 mt-10 rounded-xl hover:bg-bv-green tracking-wider"
              >
                {loading ? <Spinner /> : "Sign in"}
              </button>
            </div>
          </form>

          <div className="flex justify-center mt-10 text-center text-sm text-gray-300 gap-1">
            Not a member?
            <Link href="/signup">
              <p className="font-bold text-green-400 hover:text-bv-green-light">
                Sign Up
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
