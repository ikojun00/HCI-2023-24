import Link from "next/link";

const genres = [
  { name: "Fiction" },
  { name: "Nonfiction" },
  { name: "Fantasy" },
  { name: "Adventure" },
  { name: "Sports" },
  { name: "Romance" },
  { name: "Self-help" },
];

export default function Genres() {
  return (
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6">
      <br />
      <br />
      <br />
      <div className="flex flex-col gap-16 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl font-medium">Genres</h1>
          <h2>Explore all books on BookVoyage by genre.</h2>
        </div>
        <div className="flex gap-4">
          {genres.map((genre) => (
            <Link href={`/genres/${genre.name.toLowerCase()}`} key={genre.name}>
              <p className="hover:underline">{genre.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
