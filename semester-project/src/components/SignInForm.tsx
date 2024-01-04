import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function SignInForm() {
  const { data: session } = useSession();
  const [activeDropdown, setActiveDropdown] = useState(false);

  // prijedlog: mozda je bolje da prebacuje na novi link zvan profile naprimjer

  const handleDropdownClick = () => {
    setActiveDropdown(!activeDropdown);
  };

  return session && session.user ? (
    <div>
      <button
        className="rounded-full border-cyan-400 hover:border-cyan-600"
        onClick={handleDropdownClick}
      >
        <Image
          src="/lisa.webp"
          alt="Profile"
          className="rounded-full"
          width={20}
          height={20}
        />
      </button>
      {activeDropdown && (
        <div className="z-10 relative bg-slate-800 rounded-lg md:pr-16 md:absolute md:border-2 md:mt-2">
          <div className="flex flex-col gap-4">
            <p className="text-sky-600">{session.user.firstName}</p>
            <p className="text-sky-600">{session.user.email}</p>
            <Link
              href={"/api/auth/signout"}
              className="flex gap-4 text-red-600"
            >
              Sign Out
            </Link>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex gap-4 ml-auto items-center">
      <Link
        href={"/api/auth/signin"}
        className="bg-green-600 max-w-fit rounded-3xl hover:bg-green-700 px-4 py-2 tracking-wider"
      >
        Sign In
      </Link>
    </div>
  );
}
