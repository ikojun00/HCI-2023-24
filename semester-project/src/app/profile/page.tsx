"use client";

import Spinner from "@/components/icons/Spinner";
import AboutMeTab from "@/views/profile/AboutMeTab";
import ReadingGoalTab from "@/views/profile/ReadingGoalTab";
import SelectBookshelfTab from "@/views/profile/SelectBookshelfTab";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileImageItem from "../../../types/interfaces/ProfileImageItem";
import ContentfulService from "@/services/ContentfulService";
import Image from "next/image";
import PlaceholderIcon from "@/components/icons/PlaceholderIcon";

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
  const { data: session, status, update } = useSession();
  const [tab, setTab] = useState(tabOptions[0].id);
  const [image, setImage] = useState<ProfileImageItem | null>(null);

  useEffect(() => {
    (async () => {
      if (session?.user.profileImageId) {
        const data = await ContentfulService.getProfileImageById(
          session.user.profileImageId
        );
        setImage(data);
      }
    })();
  }, [session?.user.profileImageId]);

  if (status === "loading") {
    return (
      <div className="flex h-[calc(100vh-78px)] justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return session && session.user ? (
    <div className="max-w-screen-lg mx-auto px-6 sm:px-8">
      {/* User Info */}
      <div className="flex flex-col items-center py-16 gap-4">
        <div className="relative border-2 w-24 h-24 overflow-hidden rounded-full bg-gray-300">
          {image ? (
            <Image
              src={image.image.url}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="absolute w-24 h-24 text-gray-500 -bottom-3 -left-0.5">
              <PlaceholderIcon />
            </div>
          )}
        </div>
        <p className="text-2xl font-semibold">
          {session.user.firstName} {session.user.lastName}
        </p>
        <p className="text-gray-400">{session.user.email}</p>
        <button
          className="mt-4 text-red-600 border border-red-600 px-4 py-2 rounded-md transition-colors duration-300 hover:bg-red-600 hover:text-white"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-5">
        {/* Tabs */}
        <div className="flex flex-col gap-4 min-w-fit h-fit bg-bv-blue-dark px-4 py-8 border shadow-md rounded-md">
          {tabOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setTab(option.id)}
              className={`uppercase text-gray-200 text-base px-3 pb-1 ${
                tab === option.id
                  ? "border-bv-purple"
                  : "text-gray-400 border-transparent hover:border-bv-purple hover:border-opacity-40 transition-colors duration-300"
              } border-b-2`}
            >
              {option.title}
            </button>
          ))}
        </div>
        <div className="w-full border shadow-md rounded-md bg-bv-blue-dark px-6 py-8">
          {tab == "aboutMe" && <AboutMeTab session={session} update={update} />}
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
