"use client";

import Spinner from "@/components/icons/Spinner";
import Bookshelf from "@/views/bookshelf/Bookshelf";
import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-[calc(100vh-78px)] justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return session && session.user ? (
    <div className="flex items-center flex-col gap-4">
      <p>{session.user.firstName}</p>
      <p>{session.user.email}</p>
      <button className="text-red-600" onClick={() => signOut()}>
        Sign out
      </button>
      <Bookshelf session={session} />
    </div>
  ) : (
    <div>No data.</div>
  );
}
