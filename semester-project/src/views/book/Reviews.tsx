"use client";

import GreyStar from "@/components/icons/GreyStar";
import Spinner from "@/components/icons/Spinner";
import YellowStar from "@/components/icons/YellowStar";
import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import ReviewItem from "../../../types/interfaces/ReviewItem";
import Likes from "./Likes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PostModifyReview from "@/components/PostModifyReview";
import Pencil from "@/components/icons/Pencil";
import Trash from "@/components/icons/Trash";

type Props = {
  pathname: string;
  setAverageRating: (value: number) => void;
};

export default function Reviews({ setAverageRating, pathname }: Props) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<any>([]);
  const [reviewExists, setReviewExists] = useState<ReviewItem>();
  const [showReview, setShowReview] = useState<boolean>(false);
  const router = useRouter();

  const Stars = (num: number) => {
    const starArray = Array.from({ length: 5 }, (_, index) =>
      index < num ? <YellowStar key={index} /> : <GreyStar key={index} />
    );

    return starArray;
  };

  const handleReview = async () => {
    if (status !== "authenticated") return router.push("/signin");
    setShowReview(!showReview);
    !showReview
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  };

  const handleDeleteReview = async () => {
    try {
      await axios.delete(`${Backend_URL}/review/${pathname}`, {
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      window.location.reload();
      alert("Review deleted!");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get(`${Backend_URL}/review/${pathname}`);
      console.log(res.data);
      if (res.data.length !== 0) {
        const response = await axios.get(
          `${Backend_URL}/review/${pathname}/averageRating`
        );
        setAverageRating(Math.round(response.data.averageRating * 10) / 10);
      }
      if (session && session.user) {
        const response = await axios.get(
          `${Backend_URL}/review/${pathname}/user`,
          {
            headers: {
              Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          }
        );
        const index = res.data.findIndex(
          (item: ReviewItem) => item.id === response.data.id
        );

        index !== -1 &&
          (() => {
            const removedObject = res.data.splice(index, 1)[0];
            setReviewExists(removedObject);
          })();
      }

      setReviews(res.data);
      setLoading(false);
    })();
  }, [pathname, session, setAverageRating, status]);

  return (
    <div className="flex flex-col gap-24">
      {reviewExists === undefined ? (
        <div>
          <div className="flex flex-start">
            <button
              className="flex justify-center p-4 outline-none border-none rounded-md bg-green-600 text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-green-700"
              onClick={handleReview}
            >
              Post Review
            </button>
          </div>
          {showReview && (
            <PostModifyReview handleReview={handleReview} pathname={pathname} />
          )}
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-10 max-w-screen-xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold">Your Review</h1>
              <hr />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex gap-1">
                <p className="font-bold">{reviewExists.user.firstName}</p>
                <p className="font-bold">{reviewExists.user.lastName}</p>
              </div>
              <div className="flex">{Stars(reviewExists.stars)}</div>
            </div>
            <p className="text-xl">{reviewExists.comment}</p>
            <div className="flex items-center justify-between">
              <Likes id={reviewExists.id} pathname={pathname} />
              <div className="flex items-center gap-4">
                <div>
                  <button className="flex items-center" onClick={handleReview}>
                    <Pencil />
                  </button>
                  {showReview && (
                    <PostModifyReview
                      handleReview={handleReview}
                      pathname={pathname}
                      isModify
                    />
                  )}
                </div>
                <button
                  className="flex items-center"
                  onClick={handleDeleteReview}
                >
                  <Trash />
                </button>
              </div>
            </div>
            <hr />
            <br />
          </div>
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold">
          {reviewExists === undefined ? "All Reviews" : "Other Reviews"}
        </h1>
        <hr />
        <br />
        <br />
        {loading ? (
          <Spinner />
        ) : reviews.length === 0 ? (
          <p>No reviews.</p>
        ) : (
          reviews.map((review: ReviewItem, index: number) => (
            <div
              className="flex flex-col gap-10 max-w-screen-xl mx-auto"
              key={index}
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex gap-1">
                  <p className="font-bold">{review.user.firstName}</p>
                  <p className="font-bold">{review.user.lastName}</p>
                </div>
                <div className="flex">{Stars(review.stars)}</div>
              </div>
              <p className="text-xl">{review.comment}</p>
              <Likes id={review.id} pathname={pathname} />
              <hr />
              <br />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
