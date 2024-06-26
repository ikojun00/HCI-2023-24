import Image from "next/image";
import BookItem from "../../../types/interfaces/BookItem";
import DashboardBookCover from "./DashboardBookCover";
import Link from "next/link";

interface Props {
  sectionTitle: string;
  book: BookItem | null;
}

export default function UserOverviewBookItem({ sectionTitle, book }: Props) {
  return (
    <div className="w-32 md:w-40 flex flex-col gap-2">
      <DashboardBookCover
        bookId={book ? book.bookId : null}
        coverUrl={book ? book.cover.url : "/no-book-in-category.png"}
      />
      <p className="whitespace-nowrap uppercase text-sm lg:text-base">
        {sectionTitle}
      </p>
    </div>
  );
}
