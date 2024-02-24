import Link from "next/link";
import Image from "next/image";

const genres = [
  { name: "Adventure", image: "/adventure.webp" },
  { name: "Fantasy", image: "/fantasy.webp" },
  { name: "Fiction", image: "/fiction.webp" },
  { name: "Nonfiction", image: "/nonfiction.webp" },
  { name: "Romance", image: "/romance.webp" },
  { name: "Sports", image: "/sports.webp" },
  { name: "Self-help", image: "/self-help.webp" },
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
        <div className="flex flex-wrap gap-4">
          {genres.map((genre) => (
            <Link
              className="hover:scale-105"
              href={`/genres/${genre.name.toLowerCase()}`}
              key={genre.name}
            >
              <Image
                src={genre.image}
                alt="Genre"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "200px", height: "auto" }}
              />
              <div className="relative bottom-6 bg-slate-700">
                <p className="pl-1">{genre.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
