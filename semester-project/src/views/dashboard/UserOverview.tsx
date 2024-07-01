import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
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
  const [totalBooksRead, setTotalBooksRead] = useState<number>(0);
  // bookshelf code - 1 - Currently Reading, 2 - Read, 3 - Want to Read

  useEffect(() => {
    (async () => {
      if (session && session.user) {
        try {
          const response = await axios.get(`${Backend_URL}/bookshelf`, {
            headers: {
              Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          });

          await Promise.all(
            response.data.map(async (item: BookshelfItemFetch) => {
              const lastBookIdOnThisShelf =
                item.bookIds[item.bookIds.length - 1];
              const shelfId = item.shelf;

              const book = await ContentfulService.getBookById(
                parseInt(lastBookIdOnThisShelf)
              );
              if (shelfId === 1) setLastCurrentBook(book);
              else if (shelfId === 2) {
                setTotalBooksRead(item.bookIds.length);
                setLastReadBook(book);
              } else if (shelfId === 3) setLastAddedBook(book);
            })
          );
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

      <div className="flex overflow-x-auto no-scrollbar gap-4 md:flex-row md:gap-20 md:justify-between items-center">
        {/* Circle for progress */}

        <CircleReadingProgress
          session={session}
          totalBooksRead={totalBooksRead}
        />

        {/* Section with current read, recently read and recently added */}
        <div className="grow flex gap-4 md:justify-between">
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
