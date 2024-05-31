import Image from "next/image";
import DashboardBookCover from "./DashboardBookCover";
import BookItem from "../../../types/interfaces/BookItem";

interface Props {
  book: BookItem | null;
}

export default function DashboardBookItem({ book }: Props) {
  return (
    <div className="w-24 sm:w-32 md:w-40 flex flex-col gap-2">
      <DashboardBookCover
        coverUrl={book ? book.cover.url : "/no-book-in-category.png"}
      />
      <div className="gap-0">
        <p className="text-base font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
          {book && book.title}
        </p>
        <p className="text-sm text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis">
          {book && book.author}
        </p>
      </div>
    </div>
  );
}
