import { Backend_URL } from "@/lib/constants";
import ContentfulService from "@/services/ContentfulService";
import axios from "axios";
import { useEffect, useState } from "react";
import BookItem from "../../../types/interfaces/BookItem";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import ReadingStatus from "./ReadingStatus";
import CloseButton from "@/components/icons/CloseButton";

interface BookshelfItem {
  shelf: number;
  bookIds: BookItem[];
}

interface BookshelfItemFetch {
  shelf: number;
  bookIds: string[];
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
  bookshelfNumber: number;
}

export default function Bookshelf({ session, bookshelfNumber }: Props) {
  const [bookshelf, setBookshelf] = useState<BookshelfItem[]>([]);

  const handleDeleteBookFromBookshelf = async (bookId: number) => {
    try {
      const response = await axios.delete(
        `${Backend_URL}/bookshelf/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );

      const updatedBookshelf = bookshelf.map((item: BookshelfItem) => ({
        shelf: item.shelf,
        bookIds: item.bookIds.filter(
          (book: BookItem) => book.bookId !== response.data.bookId
        ),
      }));

      setBookshelf(updatedBookshelf);
      toast.success("Book removed from bookshelf!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    (async () => {
      if (session && session.user) {
        try {
          const response = await axios.get(`${Backend_URL}/bookshelf`, {
            headers: {
              Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          });
          const bookshelfData = await Promise.all(
            response.data.map(async (item: BookshelfItemFetch) => ({
              shelf: item.shelf,
              bookIds: await Promise.all(
                item.bookIds.map(
                  async (bookId: string) =>
                    await ContentfulService.getBookById(parseInt(bookId))
                )
              ),
            }))
          );
          setBookshelf(bookshelfData);
        } catch (error) {
          toast.error(error.response?.data?.message);
        }
      }
    })();
  }, [session, session?.backendTokens.accessToken]);

  return (
    <div>
      {bookshelf.map((item, index) => (
        <div
          className="flex flex-col gap-10 max-w-screen-lg mx-auto"
          key={index}
        >
          {item.shelf === bookshelfNumber && (
            <div className="flex flex-col gap-16 py-8">
              {item.bookIds.map((book: BookItem) => (
                <div className="flex justify-between" key={book.bookId}>
                  <li className="flex flex-row gap-4">
                    <Image
                      src={book.cover?.url}
                      alt="Cover"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <div className="flex flex-col justify-between">
                      <div>
                        <Link href={`/discover/${book.bookId}`}>
                          <h2 className="font-bold text-base sm:text-lg md:text-xl hover:underline">
                            {book.title}
                          </h2>
                        </Link>
                        <div className="flex flex-row gap-1 text-sm sm:text-base md:text-md">
                          <p>By:</p>
                          <p className="font-medium">{book.author}</p>
                        </div>
                      </div>
                      {item.shelf === 1 && (
                        <ReadingStatus
                          bookId={book.bookId}
                          pages={book.pages}
                          session={session}
                        />
                      )}
                    </div>
                  </li>

                  <div className="flex flex-col justify-center">
                    <button
                      className="bg-red-700 scale-75 p-2 md:p-4 rounded-lg"
                      onClick={() => handleDeleteBookFromBookshelf(book.bookId)}
                    >
                      <CloseButton />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
