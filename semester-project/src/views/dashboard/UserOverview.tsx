import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import CircleReadingProgress from "./CircleReadingProgress";
import { toast } from "react-toastify";
import DashboardSectionTitle from "./DashboardSectionTitle";
import UserOverviewBookItem from "./UserOverviewBookItem";
import ContentfulService from "@/services/ContentfulService";
import BookItem from "../../../types/interfaces/BookItem";

interface Session {
  user: { id: number; email: string; firstName: string };
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

interface BookshelfItemFetch {
  shelf: number;
  bookIds: string[];
}

interface Props {
  session: Session;
}

export default function UserOverview({ session }: Props) {
  const [lastCurrentBook, setLastCurrentBook] = useState<BookItem | null>(null);
  const [lastReadBook, setLastReadBook] = useState<BookItem | null>(null);
  const [lastAddedBook, setLastAddedBook] = useState<BookItem | null>(null);

  useEffect(() => {
    (async () => {
      if (session && session.user) {
        try {
          const response = await axios.get(`${Backend_URL}/bookshelf`, {
            headers: {
              Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          });

          const lastItems = await Promise.all(
            response.data.map(async (item: BookshelfItemFetch) => {
              const lastBookIdOnThisShelf =
                item.bookIds[item.bookIds.length - 1];

              const book = await ContentfulService.getBookById(
                parseInt(lastBookIdOnThisShelf)
              );
              return {
                bookId: book.bookId,
                title: book.title,
                author: book.author,
                description: book.description,
                pages: book.pages,
                cover: {
                  url: book.cover.url,
                },
              } as BookItem;
            })
          );
          setLastCurrentBook(lastItems[0]);
          setLastReadBook(lastItems[1]);
          setLastAddedBook(lastItems[2]);
        } catch (error) {
          toast.error(error.response?.data?.message);
        }
      }
    })();
  }, [session, session?.backendTokens.accessToken]);

  return (
    <section className="px-2">
      {/* Section title and line below */}
      <DashboardSectionTitle
        sectionName={`${session.user.firstName}'s overview`}
      />

      <div className="flex gap-20 justify-between items-center">
        {/* Circle for progress */}

        <div className="w-64 h-64 flex justify-center items-center">
          <CircleReadingProgress circleWidthRem={15} session={session} />
        </div>

        {/* Section with current read, recently read and recently added */}
        <div className="grow flex justify-between">
          <UserOverviewBookItem
            sectionTitle="Current read"
            book={lastCurrentBook}
          />

          <UserOverviewBookItem
            sectionTitle="Recently read"
            book={lastReadBook}
          />

          <UserOverviewBookItem
            sectionTitle="Recently added"
            book={lastAddedBook}
          />
        </div>
      </div>
    </section>
  );
}
