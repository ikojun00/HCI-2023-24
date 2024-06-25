"use client";

import Spinner from "@/components/icons/Spinner";
import AboutMeTab from "@/views/profile/AboutMeTab";
import ReadingGoalTab from "@/views/profile/ReadingGoalTab";
import SelectBookshelfTab from "@/views/profile/SelectBookshelfTab";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const tabOptions = [
  {
    title: "About Me",
    id: "aboutMe",
  },
  {
    title: "Bookshelves",
    id: "bookshelves",
  },
  {
    title: "Reading Goal",
    id: "readingGoal",
  },
];

export default function Profile() {
  const { data: session, status } = useSession();
  const [tab, setTab] = useState(tabOptions[0].id);

  if (status === "loading") {
    return (
      <div className="flex h-[calc(100vh-78px)] justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return session && session.user ? (
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6">
      {/* User Info */}
      <div className="flex flex-col gap-4 items-center py-16">
        <p>{session.user.firstName}</p>
        <p>{session.user.email}</p>
        <button className="text-red-600" onClick={() => signOut()}>
          Sign out
        </button>
      </div>

      <div className="flex gap-5">
        {/* Tabs */}
        <div className="flex flex-col gap-4 min-w-fit h-fit bg-bv-blue-dark px-4 py-8 border shadow-md rounded-md">
          {tabOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setTab(option.id)}
              className={`text-sm md:text-base px-3 pb-1 ${
                tab === option.id ? "border-bv-purple" : "border-transparent hover:border-bv-purple hover:border-opacity-40 transition-colors duration-300 "
              } border-b-2`}
            >
              {option.title}
            </button>
          ))}
        </div>
        <div className="w-full border shadow-md rounded-md bg-bv-blue-dark px-6 py-8">
          {tab == "aboutMe" && <AboutMeTab session={session} />}
          {tab == "bookshelves" && <SelectBookshelfTab session={session} />}
          {tab == "readingGoal" && <ReadingGoalTab session={session} />}
        </div>
      </div>
      {/* Tabs */}
      {/* <div className="flex gap-6 border-b">
        {tabOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setTab(option.id)}
            className={`text-sm md:text-base ${
              tab === option.id ? "border-yellow-400" : "border-bv-blue"
            } border-b-2`}
          >
            {option.title}
          </button>
        ))}
      </div> */}

      {/* Content of the tabs */}
      {/* {tab == "aboutMe" && <AboutMeTab session={session}/>}
      {tab == "bookshelves" && <SelectBookshelfTab session={session} />}
      {tab == "readingGoal" && <ReadingGoalTab session={session} />} */}
    </div>
  ) : (
    <div>No data.</div>
  );
}
