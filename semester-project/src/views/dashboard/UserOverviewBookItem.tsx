import Image from "next/image";
import BookItem from "../../../types/interfaces/BookItem";
import DashboardBookCover from "./DashboardBookCover";

interface Props {
  sectionTitle: string;
  book: BookItem | null;
}

export default function UserOverviewBookItem({ sectionTitle, book }: Props) {
  return (
    <div className="w-40 flex flex-col gap-2">
        <DashboardBookCover coverUrl={book ? book.cover.url : "/no-book-in-category.png"} />
      <p className="uppercase text-base">{sectionTitle}</p>
    </div>
  );
}
