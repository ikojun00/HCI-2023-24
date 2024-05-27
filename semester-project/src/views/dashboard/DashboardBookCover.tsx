import Image from "next/image";

interface Props {
  coverUrl: string;
}

export default function DashboardBookCover({ coverUrl }: Props) {
  return (
    <div className="w-full h-32 sm:h-44 md:h-60 border-white border-2 hover:border-[3px] hover:border-bv-purple">
      <Image
        src={coverUrl}
        alt="book"
        width={150}
        height={250}
        className="w-full h-full"
      />
    </div>
  );
}
