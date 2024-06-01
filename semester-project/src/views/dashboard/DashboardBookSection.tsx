import Image from "next/image";
import DashboardBookItem from "./DashboardBookItem";
import DashboardSectionTitle from "./DashboardSectionTitle";
import { useEffect, useState } from "react";
import BookItem from "../../../types/interfaces/BookItem";
import ContentfulService from "@/services/ContentfulService";
import Spinner from "@/components/icons/Spinner";
import axios from "axios";
import { Backend_URL } from "@/lib/constants";

interface PopularItemFetch {
  review_bookId: number;
  review_count: string;
}
interface Props {
  sectionName: string;
}

export default function DashboardBookSection({ sectionName }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<BookItem[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      if (sectionName == "New on Bookvoyage") {
        const newBooks = await ContentfulService.getNewBooks();
        setBooks(newBooks);
      }

      if (sectionName == "Popular on Bookvoyage") {
        const response = await axios.get(`${Backend_URL}/dashboard/popular`);
        const popularBooks = await Promise.all(
          response.data.map(async (item: PopularItemFetch) => {
            const bookId = item.review_bookId;
            const book = await ContentfulService.getBookById(bookId);
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
        setBooks(popularBooks);
      }
      setLoading(false);
    })();
  }, [sectionName]);

  return (
    <section className="px-2">
      {/* Section title and line below */}
      <DashboardSectionTitle sectionName={sectionName} />

      {/* Section with 5 newest books */}
      <div className="overflow-x-auto no-scrollbar flex gap-4 md:justify-between items-start">
        {loading ? (
          <div className="h-[calc(100vh-78px)] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            {books.map((book) => (
              <DashboardBookItem
                key={book.bookId}
                book={{
                  bookId: book.bookId,
                  title: book.title,
                  author: book.author,
                  description: book.description,
                  pages: book.pages,
                  cover: { url: book.cover.url },
                }}
              />
            ))}

            {Array.from({ length: Math.max(0, 5 - books.length) }, (_, i) => (
              <DashboardBookItem key={i} book={null} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
