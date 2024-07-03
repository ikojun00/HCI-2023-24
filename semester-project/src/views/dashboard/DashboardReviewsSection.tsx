import Link from "next/link";
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
    profileImageId: number;
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
    profileImageId: number;
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
          const book = await ContentfulService.getBookById(item.bookId);
          return {
            id: item.id,
            bookId: item.bookId,
            stars: item.stars,
            comment: item.comment,
            user: {
              firstName: item.user.firstName,
              lastName: item.user.lastName,
              profileImageId: item.user.profileImageId,
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

  const [profileImageUrls, setProfileImageUrls] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const fetchProfileImages = async () => {
      const newProfileImageUrls: { [key: string]: string } = {};
      await Promise.all(
        reviews.map(async (review) => {
          if (review.user.profileImageId) {
            const res = await ContentfulService.getProfileImageById(
              review.user.profileImageId
            );
            newProfileImageUrls[review.id] = res?.image.url || "";
          }
        })
      );
      setProfileImageUrls(newProfileImageUrls);
    };

    if (reviews.length > 0) {
      fetchProfileImages();
    }
  }, [reviews]);

  return (
    <section>
      {/* Section title and line below */}
      <DashboardSectionTitle sectionName="Latest reviews on BookVoyage" />

      <div className="max-w-full mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
        {loading ? (
          <div className="h-[calc(100vh-78px)] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          reviews.map((review) => (
            <article
              key={review.id}
              className="border p-5 pb-6 pr-6 rounded-lg shadow-md bg-bv-blue-dark"
            >
              <div className="flex items-center gap-2 pb-2 text-sm text-gray-400 mb-1">
                <div className="relative w-6 h-6 overflow-hidden bg-gray-300 hover:bg-gray-200 rounded-full">
                  {/* User's image */}
                  {review.user.profileImageId &&
                    profileImageUrls[review.id] && (
                      <Image
                        className="circle-image"
                        height={64}
                        width={64}
                        sizes="100vw"
                        src={profileImageUrls[review.id]}
                        alt="Profile Photo"
                      />
                    )}
                </div>
                <p className="text-white">
                  {review.user.firstName + " " + review.user.lastName}{" "}
                </p>
                <p>|</p>
                <p>{review.stars} stars</p>
              </div>

              <div className="flex gap-4 ">
                <div className="w-24 md:w-32 lg:w-40 shrink-0">
                  {review.bookId ? (
                    <Link href={`/discover/${review.bookId}`}>
                      <div className="w-full h-36 md:h-48 lg:h-60 border-white border-2 hover:border-[3px] hover:border-bv-purple transition-colors duration-300">
                        <Image
                          src={review.bookImgSrc}
                          alt="book"
                          width={150}
                          height={250}
                          sizes="100vw"
                          className="w-full h-full"
                        />
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full h-36 md:h-48 lg:h-60 border-white border-2 hover:border-[3px] hover:border-bv-purple transition-colors duration-300">
                      <Image
                        src="/no-book-in-category.png"
                        alt="book"
                        width={150}
                        height={250}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
                <div className="font-light text-sm lg:mt-8 lg:mb-5 mr-2 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-300">read and reviewed</p>
                    <h3 className="text-base font-medium">
                      <Link href={`/discover/${review.bookId}`}>
                        <span className="hover:text-bv-purple-light transition-colors duration-300">
                          {review.title}{" "}
                        </span>
                      </Link>
                      <span className="font-light">by </span>
                      <span>{review.author}</span>
                    </h3>
                    <p className="mt-2 text-gray-300 md:h-11 lg:h-16 overflow-hidden text-ellipsis line-clamp-2 lg:line-clamp-3">
                      {review.comment}
                    </p>
                  </div>
                  <ButtonAddBook
                    bookId={review.bookId}
                    pageComponentisUsedOn="Dashboard"
                  />
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
