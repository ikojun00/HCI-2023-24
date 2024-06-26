import Image from "next/image";
import DashboardBookCover from "./DashboardBookCover";
import BookItem from "../../../types/interfaces/BookItem";
import Link from "next/link";

interface Props {
  book: BookItem | null;
}

export default function DashboardBookItem({ book }: Props) {
  return (
    <div className="w-30 sm:w-32 md:w-40 flex flex-col gap-2 shrink-0">
      <DashboardBookCover
        bookId={book ? book.bookId : null}
        coverUrl={book ? book.cover.url : "/no-book-in-category.png"}
      />
      <div className="gap-0">
        {book ? (
          <Link href={`/discover/${book.bookId}`}>
            <p className="text-sm md:text-sm lg:text-base font-semibold overflow-hidden whitespace-nowrap text-ellipsis hover:text-bv-purple  transition-colors duration-300">
              {book && book.title}
            </p>
          </Link>
        ) : (
          <p className="text-sm md:text-sm lg:text-base font-semibold overflow-hidden whitespace-nowrap text-ellipsis hover:text-bv-purple transition-colors duration-300"></p>
        )}

        <p className="text-xs md:text-sm text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis">
          {book && book.author}
        </p>
      </div>
    </div>
  );
}
