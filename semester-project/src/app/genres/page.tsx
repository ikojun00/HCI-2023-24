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
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6">
      <br />
      <br />
      <br />
      <div className="flex flex-col gap-16 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl font-medium">Genres</h1>
          <h2>Explore all books on BookVoyage by genre.</h2>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap gap-4">
            {genres.map((genre) => (
              <Link
                className="hover:scale-105"
                href={`/genres/${genre.title.toLowerCase()}`}
                key={genre.title}
              >
                <Image
                  src={genre.image.url}
                  alt="Genre"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "200px", height: "auto" }}
                />
                <div className="relative bottom-6 bg-slate-700">
                  <p className="pl-1">{genre.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
