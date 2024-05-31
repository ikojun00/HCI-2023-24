import Link from "next/link";
import DashboardBookCover from "./DashboardBookCover";
import DashboardSectionTitle from "./DashboardSectionTitle";
import Image from "next/image";
import ButtonAddBook from "./ButtonAddBook";
import { useEffect, useState } from "react";

interface Props {}
const reviews = [
  {
    id: 1,
    stars: 3,
    comment: "I loved this product! It exceeded my expectations.",
    user: {
      firstName: "Ante",
      lastName: "Tolic",
    },
    title: "Book Title",
  },
  {
    id: 1,
    stars: 3,
    comment: "The product is okay, but there are some issues.",
    user: {
      firstName: "Ante",
      lastName: "Tolic",
    },
    title: "Book Title",
  },
  {
    id: 1,
    stars: 3,
    comment:
      "I am very satisfied with my pure. Very very long comment. Very Very long. Very very long comment. Very Very long. Very very long comment. Very Very long. Very very long comment. Very Very long.",
    user: {
      firstName: "Ante",
      lastName: "Tolic",
    },
    title: "Book Title",
  },
  {
    id: 1,
    stars: 3,
    comment: "The product did not work as described.",
    user: {
      firstName: "Ante",
      lastName: "Tolic",
    },
    title: "Book Title",
  },
];
export default function DashboardReviewsSection({}: Props) {
  //const [reviews, setReviews] = useState([]);
  /* useEffect(()=>{

    }, [reviews]); */
  return (
    <section className="px-2">
      {/* Section title and line below */}
      <DashboardSectionTitle sectionName="Latest reviews on BookVoyage" />

      <div className="max-w-full mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
        {reviews.map((review, index) => (
          <div
            key={index}
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
                <DashboardBookCover coverUrl="/tomor.jpg" />
              </div>
              <div className="font-light text-sm mt-8">
                <p className="text-sm text-gray-300">read and reviewed</p>
                <h3 className="text-base font-medium">
                  <span>{review.title} Title </span>
                  <span className="font-light">by </span>
                  <span>{review.title} Author</span>
                </h3>
                <p className="mt-2 text-sm text-gray-300 max-h-16 overflow-y-hidden text-ellipsis">
                  {review.comment}
                </p>
                <ButtonAddBook />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
