import { Backend_URL } from "@/lib/constants";
import ContentfulService from "@/services/ContentfulService";
import axios from "axios";
import { useEffect, useState } from "react";
import BookItem from "../../../types/interfaces/BookItem";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import ReadingStatus from "./ReadingStatus";
import Trash from "@/components/icons/Trash";

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

export default function Bookshelf({ session }: Props) {
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

      // solve error
      /*const updatedBookshelf = bookshelf.map((item) => ({
        shelf: item.shelf,
        bookIds: item.bookIds.filter(
          (book: BookItem) => book.bookId !== response.data.bookId
        ),
      }));

      setBookshelf(updatedBookshelf);*/
      toast.success("Book removed from bookshelf!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const getBookById = async (item: string) =>
      await ContentfulService.getBookById(parseInt(item));
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
                  async (element: string) => await getBookById(element)
                )
              ),
            }))
          );
          console.log(bookshelfData);
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
          className="flex flex-col gap-10 max-w-screen-xl mx-auto"
          key={index}
        >
          {item.shelf === 1 ? (
            <h1>Currently Reading</h1>
          ) : item.shelf === 2 ? (
            <h1>Read</h1>
          ) : item.shelf === 3 ? (
            <h1>Want to Read</h1>
          ) : (
            ""
          )}
          <div className="flex flex-row gap-4">
            {item.bookIds.map((book: BookItem) => (
              <div className="max-w-3xl" key={book.bookId}>
                <button
                  onClick={() => handleDeleteBookFromBookshelf(book.bookId)}
                >
                  <Trash />
                </button>
                <Link href={`/discover/${book.bookId}`}>
                  <li className="flex flex-row gap-4">
                    <Image
                      src={book.cover?.url}
                      alt="Cover"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <div className="flex flex-col">
                      <h2 className="font-bold md:text-xl">{book.title}</h2>
                      <div className="flex flex-row gap-1 md:text-md">
                        <p>By:</p>
                        <p className="font-medium">{book.author}</p>
                      </div>
                    </div>
                  </li>
                </Link>
                {item.shelf === 1 && (
                  <ReadingStatus bookId={book.bookId} session={session} />
                )}
                <br />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
