import Link from "next/link";
import Navbar from "../components/Navbar";

export default function page() {
  return (
    <div className="bg-fixed bg-center bg-cover custom-img h-screen text-white">
    <Navbar/>
    <div className="max-w-2xl mx-auto flex flex-col justify-center px-2 py-10 lg:px-4 bg-black bg-opacity-70 rounded-xl mt-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6">
                Full Name
                </label>
                <div className="mt-2">
                <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-black pl-2 placeholder:text-gray-400"
                />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6">
                Email address
                </label>
                <div className="mt-2">
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-black pl-2 placeholder:text-gray-40"
                />
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                    Password
                </label>
                </div>
                <div className="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-black pl-2 placeholder:text-gray-400"
                />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center text-center bg-green-500 p-2 mt-10 rounded-xl hover:bg-green-600 tracking-wider"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-300">
        Already have an account?
          <Link href="/signin">
            <p className="font-bold text-green-400 hover:text-green-500">
                Login Here
            </p>
          </Link>
        </p>
      </div>
    </div>
    </div>
  )
}
