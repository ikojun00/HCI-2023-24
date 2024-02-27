"use client";

import Spinner from "@/components/icons/Spinner";
import Bookshelf from "@/views/bookshelf/Bookshelf";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const [tabs, setTabs] = useState(1);

  if (status === "loading") {
    return (
      <div className="flex h-[calc(100vh-78px)] justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return session && session.user ? (
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6">
      <div className="flex flex-col gap-4 items-center py-16">
        <p>{session.user.firstName}</p>
        <p>{session.user.email}</p>
        <button className="text-red-600" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
      <div className="flex gap-6 border-b">
        <button
          onClick={() => setTabs(1)}
          className={`text-sm md:text-base ${
            tabs === 1 ? "border-yellow-400" : "border-slate-800"
          } border-b-2`}
        >
          Currently reading
        </button>
        <button
          onClick={() => setTabs(2)}
          className={`text-sm md:text-base ${
            tabs === 2 ? "border-yellow-400" : "border-slate-800"
          } border-b-2`}
        >
          Read
        </button>
        <button
          onClick={() => setTabs(3)}
          className={`text-sm md:text-base ${
            tabs === 3 ? "border-yellow-400" : "border-slate-800"
          } border-b-2`}
        >
          Want to read
        </button>
      </div>
      <Bookshelf session={session} tabs={tabs} />
    </div>
  ) : (
    <div>No data.</div>
  );
}
