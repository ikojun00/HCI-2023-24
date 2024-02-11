import Link from "next/link";

export default function Genres() {
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
      Genres
      <Link href={`/genres/fiction`}>
        <div>Fiction</div>
      </Link>
      <Link href={`/genres/nonfiction`}>
        <div>Nonfiction</div>
      </Link>
      <Link href={`/genres/fantasy`}>
        <div>Fantasy</div>
      </Link>
    </div>
  );
}
