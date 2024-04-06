import Image from "next/image";

interface Props {
  key: number;
}

export default function DashboardBookItem({ key }: Props) {
  return (
    <div key={key} className="w-40 flex flex-col gap-2">
      <div className="w-full h-60 border-white border-2">
        <Image
          src="/tomor.jpg"
          alt="book"
          width={150}
          height={250}
          className="w-full h-full"
        />
      </div>
      <div className="gap-0">
        <p className="text-base font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
          Long book title title title
        </p>
        <p className="text-sm text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis">
          Author Name
        </p>
      </div>
    </div>
  );
}
