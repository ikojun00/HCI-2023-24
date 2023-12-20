"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="z-10 bg-slate-800 rounded-lg max-w-fit absolute border-2 mt-2">
      <button onClick={() => signOut()} className="text-red-600">
        Sign Out
      </button>
    </div>
  );
}
