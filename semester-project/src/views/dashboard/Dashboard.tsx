import { Backend_URL } from "@/lib/constants";
import ContentfulService from "@/services/ContentfulService";
import axios from "axios";
import { useEffect, useState } from "react";
import BookItem from "../../../types/interfaces/BookItem";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import UserOverview from "./UserOverview";
import DashboardBookSection from "./DashboardBookSection";

interface BookshelfItem {
  shelf: number;
  bookIds: [];
}

interface Session {
  user: { id: number; email: string; firstName: string };
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

interface Props {
  session: Session;
}

export default function Dashboard({ session }: Props) {
  const [currentlyReadingBookIDs, setCurrentlyReadingBookIDs] = useState<[]>(
    []
  );

  /*
  useEffect(() => {
    const getBookById = async (bookId: number) =>
      await ContentfulService.getBookById(bookId);
    (async () => {
      if (session && session.user) {
        try {
          const response = await axios.get(`${Backend_URL}/bookshelf`, {
            headers: {
              Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          });

          const bookshelfData = await Promise.all(
            response.data.map(async (item: BookshelfItem) => ({
              shelf: item.shelf,
              bookIds: await Promise.all(
                item.bookIds.map(
                  async (element: number) => await getBookById(element)
                )
              ),
            }))
          );
          console.log(bookshelfData);
          bookshelfData.forEach((element) => {
            if (element.shelf === 1) {
              //this is currently reading shelf
              //add it's list od IDs to state so we can go through them and display the books on that shelf
              setCurrentlyReadingBookIDs(element.bookIds);
            }
          });
        } catch (error) {
          alert(error.response?.data?.message);
        }
      }
    })();
  }, [session, session?.backendTokens.accessToken]);*/

  /*const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value, 10);
    setProgress(newProgress);
  };*/
  return (
    <div className="flex flex-col max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6 gap-28">
      <div className="flex justify-center mt-44 text-2xl px-2">
        Welcome, {session.user.firstName}! Here is what we have been reading...
      </div>

      {/* User's overview section */}
      <UserOverview session={session} />

      {/* New on Bookvoyage section */}
      <DashboardBookSection sectionName="New on Bookvoyage" />

      {/*
      <section className="flex flex-col">
        <div className="mb-4">
          <h1 className="text-3xl font-medium mb-1">
            {"Books You're Currently Reading..."}
          </h1>
          <hr />
        </div>
        <div className="py-8 w-full overflow-x-auto no-scrollbar flex gap-4 ">
          {currentlyReadingBookIDs.map((book: BookItem, index: number) => (
            <div
              key={book.bookId}
              className="flex w-96 flex-none mt-2 px-6 mb-0 rounded-md bg-slate-400 gap-8"
            >
              <Link
                href={`/discover/${book.bookId}`}
                className="w-20 flex-none"
              >
                <Image
                  width={200}
                  height={300}
                  src={book.cover?.url}
                  alt="book"
                  className="w-full max-w-full rounded-md transition-all duration-200 -translate-y-5"
                />
              </Link>
              <div className="flex flex-1 overflow-hidden flex-col items-start justify-between py-5">
                <div className="w-full mb-4">
                  <Link href={`/discover/${book.bookId}`}>
                    <h3 className="overflow-hidden whitespace-nowrap text-ellipsis font-black text-slate-900">
                      {book.title}
                    </h3>
                  </Link>
                  <h4 className="overflow-hidden whitespace-nowrap text-ellipsis text-slate-700 font-medium">
                    {book.author}
                  </h4>
                </div>
                <div className="flex flex-row items-center space-x-2">
                  <div className="w-20 h-2.5 bg-white rounded-full">
                    <div
                      className="h-full bg-slate-800 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-800 font-medium">
                    {progress}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      */}
      {/*
      <section className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-3xl font-medium mb-1">{"Trending books"}</h1>
          <hr />
        </div>
        <div className="flex items-end gap-4">
          <Link href={`/discover`} className="">
            <Image
              src="/tomor.jpg"
              alt="book"
              width={200}
              height={300}
              className="rounded-sm border-2 border-white hover:border-green-500"
            />
          </Link>
          <div className="flex gap-4">
            <Link href={`/discover`} className="w-1/12">
              <Image
                src="/tomor.jpg"
                alt="book"
                width={200}
                height={300}
                className="rounded-sm border-2 border-white hover:border-green-500 w-52"
              />
            </Link>
            <Link href={`/discover`} className="w-1/12">
              <Image
                src="/tomor.jpg"
                alt="book"
                width={200}
                height={300}
                className="rounded-sm border-2 border-white hover:border-green-500"
              />
            </Link>
            <Link href={`/discover`} className="w-1/12">
              <Image
                src="/tomor.jpg"
                alt="book"
                width={200}
                height={300}
                className="rounded-sm border-2 border-white hover:border-green-500"
              />
            </Link>
            <Link href={`/discover`} className="w-1/12">
              <Image
                src="/tomor.jpg"
                alt="book"
                width={200}
                height={300}
                className="rounded-sm border-2 border-white hover:border-green-500"
              />
            </Link>
            <Link href={`/discover`} className="w-1/12">
              <Image
                src="/tomor.jpg"
                alt="book"
                width={200}
                height={300}
                className="rounded-sm border-2 border-white hover:border-green-500"
              />
            </Link>
            <Link href={`/discover`} className="w-1/12">
              <Image
                src="/tomor.jpg"
                alt="book"
                width={200}
                height={300}
                className="rounded-sm border-2 border-white hover:border-green-500"
              />
            </Link>
          </div>
        </div>
      </section>
      */}
    </div>
  );
}
