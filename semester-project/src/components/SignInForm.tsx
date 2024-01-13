import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Button from "@/views/navbar/Button";

export default function SignInForm() {
  const { data: session } = useSession();
  // prijedlog: mozda je bolje da prebacuje na novi link zvan profile naprimjer

  return session && session.user ? (
    <div>
      <button className="rounded-full border-2 border-slate-600 hover:border-slate-400">
        <Link href={"/profile"} className="flex gap-4 text-red-600">
          <Image
            src="/lisa.webp"
            alt="Profile"
            className="rounded-full"
            width={40}
            height={40}
          />
        </Link>
      </button>

      {/*{activeDropdown && (
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
      )}*/}
    </div>
  ) : (
    <div className="flex gap-4 ml-auto items-center">
      <Button title={"Sign In"} link={"/api/auth/signin"} />
    </div>
  );
}
