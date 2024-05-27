import Image from "next/image";
import DashboardBookItem from "./DashboardBookItem";
import DashboardSectionTitle from "./DashboardSectionTitle";
import { useEffect, useState } from "react";
import BookItem from "../../../types/interfaces/BookItem";
import ContentfulService from "@/services/ContentfulService";
import Spinner from "@/components/icons/Spinner";

interface Props {
  sectionName: string;
}

export default function DashboardBookSection({ sectionName }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<BookItem[]>([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const newBooks = await ContentfulService.getNewBooks();
      setBooks(newBooks);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="px-2">
      {/* Section title and line below */}
      <DashboardSectionTitle sectionName={sectionName} />

      {/* Section with 5 newest books */}
      <div className="overflow-x-auto no-scrollbar flex gap-4 md:justify-between items-center">
        {loading ? (
          <div className="h-[calc(100vh-78px)] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          books.map((book) => (
            //key should be book.bookId, but as a placeholder we use index
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
          ))
        )}
        {/* {[...Array(5)].map((_, index) => (
          //key should be book.bookId, but as a placeholder we use index
          <DashboardBookItem
            key={index}
            book={{
              bookId: 99,
              title: "Long book title title title",
              author: "Author Name",
              description: "Not important",
              pages: 19,
              cover: { url: "/tomor.jpg" },
            }}
          />
        ))} */}
      </div>
    </section>
  );
}
