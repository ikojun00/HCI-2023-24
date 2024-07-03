"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ContentfulService from "@/services/ContentfulService";
import GenreItem from "../../../types/interfaces/GenreItem";
import Spinner from "@/components/icons/Spinner";

export default function Genres() {
  const [genres, setGenres] = useState<GenreItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setGenres(await ContentfulService.getAllGenres());
      setLoading(false);
    })();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto px-6 sm:px-8 mt-14">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center">
            Genres
          </h1>
          <h2 className="text-center text-lg sm:text-xl text-gray-400">
            Explore all books on BookVoyage by genre.
          </h2>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {genres.map((genre) => (
              <Link
                href={`/genres/${genre.title.toLowerCase()}`}
                key={genre.title}
                className="group flex flex-col items-center transition-transform transform hover:scale-105"
              >
                <div className="relative w-full overflow-hidden rounded-lg bg-gray-200">
                  <Image
                    src={genre.image.url}
                    alt={genre.title}
                    width={200}
                    height={300}
                    layout="responsive"
                    objectFit="cover"
                    className="transition-transform transform group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                    <p className="text-sm sm:text-base font-medium">
                      {genre.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
