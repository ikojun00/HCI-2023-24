import Image from "next/image";
import DashboardBookCover from "./DashboardBookCover";
import BookItem from "../../../types/interfaces/BookItem";

interface Props {
  key: number;
  book: BookItem;
}

export default function DashboardBookItem({ key, book }: Props) {
  return (
    //key should be book.bookId, but as a placeholder we use index
    <div key={key} className="w-40 flex flex-col gap-2">
      <DashboardBookCover coverUrl={book.cover.url} />
      <div className="gap-0">
        <p className="text-base font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
          {book.title}
        </p>
        <p className="text-sm text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis">
          {book.author}
        </p>
      </div>
    </div>
  );
}
