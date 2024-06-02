import Link from "next/link";
import DashboardBookCover from "./DashboardBookCover";
import DashboardSectionTitle from "./DashboardSectionTitle";
import Image from "next/image";
import ButtonAddBook from "./ButtonAddBook";
import { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "@/lib/constants";
import ContentfulService from "@/services/ContentfulService";
import Spinner from "@/components/icons/Spinner";

interface Session {
  user: { id: number; email: string; firstName: string };
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

interface ReviewFetch {
  id: number;
  bookId: number;
  stars: number;
  comment: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface RecentReviewInterface {
  id: number;
  bookId: number;
  stars: number;
  comment: string;
  user: {
    firstName: string;
    lastName: string;
  };
  title: string;
  author: string;
  bookImgSrc: string;
}
interface Props {
  session: Session;
}

export default function DashboardReviewsSection({ session }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<RecentReviewInterface[]>([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(`${Backend_URL}/dashboard/reviews`);
      const recentReviews = await Promise.all(
        response.data.map(async (item: ReviewFetch) => {
          console.log("hi");
          const book = await ContentfulService.getBookById(item.bookId);
          return {
            id: item.id,
            bookId: item.bookId,
            stars: item.stars,
            comment: item.comment,
            user: {
              firstName: item.user.firstName,
              lastName: item.user.lastName,
            },
            title: book.title,
            author: book.author,
            bookImgSrc: book.cover.url,
          } as RecentReviewInterface;
        })
      );
      setReviews(recentReviews);
      setLoading(false);
    })();
  }, [session, session?.backendTokens.accessToken]);
  return (
    <section className="px-2">
      {/* Section title and line below */}
      <DashboardSectionTitle sectionName="Latest reviews on BookVoyage" />

      <div className="max-w-full mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
        {loading ? (
          <div className="h-[calc(100vh-78px)] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border p-5 pb-6 pr-6 rounded-lg shadow-md bg-slate-900"
            >
              <div className="flex items-center gap-2 pb-2 text-sm text-gray-400 mb-1">
                <button className="relative w-6 h-6 overflow-hidden bg-gray-300 hover:bg-gray-200 rounded-full">
                  <Link
                    href={"/profile"}
                    className="flex justify-center items-center"
                  >
                    {/* User's image */}
                  </Link>
                </button>
                <p className="text-white">
                  {review.user.firstName + " " + review.user.lastName}{" "}
                </p>
                <p>|</p>
                <p>2 days ago</p>
              </div>

              <div className="flex gap-4">
                <div className="w-24 sm:w-32 md:w-40 shrink-0">
                  <DashboardBookCover coverUrl={review.bookImgSrc} />
                </div>
                <div className="font-light text-sm mt-8">
                  <p className="text-sm text-gray-300">read and reviewed</p>
                  <h3 className="text-base font-medium">
                    <span>{review.title} </span>
                    <span className="font-light">by </span>
                    <span>{review.author}</span>
                  </h3>
                  <p className="mt-2 text-sm text-gray-300 h-16 overflow-hidden text-ellipsis line-clamp-3">
                    {review.comment}
                  </p>
                  <ButtonAddBook session={session} bookId={review.bookId} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
