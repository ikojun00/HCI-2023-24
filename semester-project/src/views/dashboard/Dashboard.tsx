import { Backend_URL } from "@/lib/constants";
import ContentfulService from "@/services/ContentfulService";
import axios from "axios";
import { useEffect, useState } from "react";
import BookItem from "../../../types/interfaces/BookItem";
import Link from "next/link";
import Image from "next/image";

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
  const [progress, setProgress] = useState(50);
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
    <div className="flex flex-col max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6 gap-44">
      <div className="flex justify-center mt-44 text-2xl">
        Welcome, {session.user.firstName}! Here is what we have been reading...
      </div>

      {/* User's overview section */}
      <section className="">
        {/* Section title and line below */}
        <div className="mb-7">
          <h3 className="uppercase text-base text-gray-400 mb-2">
            {session.user.firstName}&apos;s overview
          </h3>
          <hr />
        </div>

        <div className="flex gap-20 justify-between items-center">
          {/* Circle for progress */}
          <div className="w-64 h-64 aspect-square flex justify-center items-center">
            <div className=" w-full h-full border border-blue-400 rounded-full flex justify-center items-center p-2">
              <div className="w-full h-full border border-blue-400 rounded-full flex flex-col justify-center items-center">
                <h1 className="text-6xl">65%</h1>
                <p className="uppercase text-lg">12 books left</p>
              </div>
            </div>
          </div>

          {/* Section with current read, recently read and recently added */}
          <div className="grow flex justify-between gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="w-40 flex flex-col gap-2">
                <div className="w-full h-56 bg-white border-black border-2">
                  <Image
                    src="/tomor.jpg"
                    alt="book"
                    width={150}
                    height={250}
                    className="w-full h-full"
                  />
                </div>
                <p className="uppercase text-base">Current read</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-500"> Popular books</section>

      {/* <section className="flex flex-col">
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

      <section>
        <div>
          <h1 className="text-3xl font-medium mb-1">
            {"Your recent activity"}
          </h1>
          <hr />
        </div>
        <div>
          {/*get 5 most recent reviews here */}
          <article>
            <p>YourName reviewed ThisTitle</p>
            <div className="flex gap-4">
              <div className="h-32 w-20 bg-red-700">RImage</div>
              <div>
                <p>ReviewBookTitle</p>
                <p>ReviewBookAuthor</p>
                <div>Stars Container</div>
                <div>
                  If there is book review comment then post the comment, else
                  post No text
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
