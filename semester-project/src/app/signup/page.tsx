"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Backend_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import axios from "axios";
import Spinner from "@/components/icons/Spinner";
import { toast } from "react-toastify";

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [registration, setRegistration] = useState<FormInputs>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      await axios.post(
        `${Backend_URL}/auth/signup`,
        {
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
          password: registration.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      toast.success("User Registered!");
      router.push("/signin");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="text-white">
      <div className="max-w-2xl mx-auto flex flex-col justify-center px-2 py-10 lg:px-4 bg-bv-blue-dark rounded-xl mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={register} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  onChange={(e) =>
                    setRegistration((prevData: FormInputs) => ({
                      ...prevData,
                      firstName: e.target.value,
                    }))
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-black pl-2 placeholder:text-gray-400"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  onChange={(e) =>
                    setRegistration((prevData: FormInputs) => ({
                      ...prevData,
                      lastName: e.target.value,
                    }))
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-black pl-2 placeholder:text-gray-400"
                />
              </div>
            </div>
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
                    setRegistration((prevData: FormInputs) => ({
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
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) =>
                    setRegistration((prevData: FormInputs) => ({
                      ...prevData,
                      password: e.target.value,
                    }))
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-black pl-2 placeholder:text-gray-400"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center text-center bg-green-500 p-2 mt-10 rounded-xl hover:bg-green-600 tracking-wider"
              >
                {loading ? <Spinner /> : "Sign up"}
              </button>
            </div>
          </form>

          <div className="flex justify-center mt-10 text-center text-sm text-gray-300 gap-1">
            Already have an account?
            <Link href="/signin">
              <p className="font-bold text-green-400 hover:text-green-500">
                Login Here
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
