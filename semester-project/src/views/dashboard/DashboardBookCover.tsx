import Image from "next/image";
import Link from "next/link";

interface Props {
  bookId: number | null;
  coverUrl: string;
}

export default function DashboardBookCover({ bookId, coverUrl }: Props) {
  return (
    <>
      {bookId ? (
        <Link href={`/discover/${bookId}`}>
          <div className="w-full h-48 md:h-60 border-white border-2 hover:border-[3px] hover:border-bv-purple transition-colors duration-300">
            <Image
              src={coverUrl}
              alt="book"
              width={150}
              height={250}
              className="w-full h-full"
            />
          </div>
        </Link>
      ) : (
        <div className="w-full h-48 md:h-60 border-white border-2 hover:border-[3px] hover:border-bv-purple transition-colors duration-300">
          <Image
            src={coverUrl}
            alt="book"
            width={150}
            height={250}
            className="w-full h-full"
          />
        </div>
      )}
    </>
  );
}
