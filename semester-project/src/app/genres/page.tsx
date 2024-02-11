import Link from "next/link";

export default function Genres() {
  return (
    <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
      <br />
      <br />
      <br />
      <div className="flex flex-col gap-16 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl font-medium">Genres</h1>
          <h2>Explore all books on BookVoyage by genre.</h2>
        </div>
        <div className="flex flex-col gap-4">
          <Link href={`/genres/fiction`}>
            <div className="hover:underline">Fiction</div>
          </Link>
          <Link href={`/genres/nonfiction`}>
            <div className="hover:underline">Nonfiction</div>
          </Link>
          <Link href={`/genres/fantasy`}>
            <div className="hover:underline">Fantasy</div>
          </Link>
          <Link href={`/genres/adventure`}>
            <div className="hover:underline">Adventure</div>
          </Link>
          <Link href={`/genres/sports`}>
            <div className="hover:underline">Sports</div>
          </Link>
          <Link href={`/genres/romance`}>
            <div className="hover:underline">Romance</div>
          </Link>
          <Link href={`/genres/self-help`}>
            <div className="hover:underline">Self-help</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
