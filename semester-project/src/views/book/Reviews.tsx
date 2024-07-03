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
import PostModifyReview from "@/views/book/PostModifyReview";
import Pencil from "@/components/icons/Pencil";
import Trash from "@/components/icons/Trash";
import { toast } from "react-toastify";
import BookPageSectionTitle from "./BookPageSectionTitle";
import Link from "next/link";
import Image from "next/image";
import ContentfulService from "@/services/ContentfulService";

type Props = {
  pathname: string;
  setAverageRating: (value: number) => void;
};

export default function Reviews({ setAverageRating, pathname }: Props) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [reviewExists, setReviewExists] = useState<ReviewItem | null>(null);
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

  const handleSubmitReview = async (
    comment: string,
    stars: number,
    isModify: boolean
  ) => {
    try {
      const res = await axios[isModify ? "patch" : "post"](
        `${Backend_URL}/review/${pathname}`,
        {
          comment: comment,
          stars: stars,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      await getUserReview();
      handleReview();
      toast.success(isModify === true ? "Review modified!" : "Review posted!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteReview = async () => {
    try {
      await axios.delete(`${Backend_URL}/review/${pathname}`, {
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      setReviewExists(null);
      toast.success("Review deleted!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // code duplicate - setting as one function is difficult
  const getUserReview = async () => {
    const response = await axios.get(`${Backend_URL}/review/${pathname}/user`, {
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    });
    setReviewExists(response.data);
  };

  useEffect(() => {
    const separateUserReviewFromReviews = async (reviews: ReviewItem[]) => {
      const response = await axios.get(
        `${Backend_URL}/review/${pathname}/user`,
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );

      // find index of user review in reviews
      const index = reviews.findIndex(
        (item: ReviewItem) => item.id === response.data.id
      );

      // if user review exists, remove it from array review and set it setReviewExists state
      index !== -1 &&
        (() => {
          const removedObject = reviews.splice(index, 1)[0];
          setReviewExists(removedObject);
        })();
    };

    const getAverageRating = async () => {
      const response = await axios.get(
        `${Backend_URL}/review/${pathname}/averageRating`
      );
      setAverageRating(
        Math.round(parseFloat(response.data.averagerating) * 10) / 10
      );
    };

    (async () => {
      setLoading(true);
      const res = await axios.get(`${Backend_URL}/review/${pathname}`);
      if (res.data.length !== 0) {
        getAverageRating();
      }
      if (session && session.user) {
        separateUserReviewFromReviews(res.data);
      }
      setReviews(res.data);
      setLoading(false);
    })();
  }, [pathname, session, setAverageRating, status]);

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
    <div className="flex flex-col gap-24">
      {reviewExists === null ? (
        <div>
          <div className="flex flex-start">
            <button
              className="flex justify-center py-3 md:py-3.5 px-4 outline-none border-none rounded-md bg-bv-green text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-bv-green-dark"
              onClick={handleReview}
            >
              Post Review
            </button>
          </div>
          {showReview && (
            <PostModifyReview
              handleReview={handleReview}
              handleSubmitReview={handleSubmitReview}
              isModify={false}
            />
          )}
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-10 max-w-screen-lg mx-auto">
            <BookPageSectionTitle sectionName="Your Review" />
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <button className="relative w-6 h-6 overflow-hidden bg-gray-300 hover:bg-gray-200 rounded-full">
                  <Link
                    href={"/profile"}
                    className="flex justify-center items-center"
                  >
                    {/* User's image */}
                    {reviewExists.user.profileImageId &&
                      profileImageUrls[reviewExists.id] && (
                        <Image
                          className="circle-image"
                          height={64}
                          width={64}
                          sizes="100vw"
                          src={profileImageUrls[reviewExists.id]}
                          alt="Profile Photo"
                        />
                      )}
                  </Link>
                </button>
                <p className="text-white">
                  {reviewExists.user.firstName +
                    " " +
                    reviewExists.user.lastName}
                </p>
              </div>
              <div className="flex">{Stars(reviewExists.stars)}</div>
            </div>
            <p>{reviewExists.comment}</p>
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
                      handleSubmitReview={handleSubmitReview}
                      isModify={true}
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
          </div>
        </div>
      )}
      <div>
        <BookPageSectionTitle
          sectionName={
            reviewExists === undefined ? "All Reviews" : "Other Reviews"
          }
        />
        {loading ? (
          <Spinner />
        ) : reviews.length === 0 ? (
          <p className="mt-10">No reviews.</p>
        ) : (
          reviews.map((review: ReviewItem, index: number) => (
            <div
              className="flex flex-col gap-10 max-w-screen-lg mx-auto mt-10"
              key={index}
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <button className="relative w-6 h-6 overflow-hidden bg-gray-300 hover:bg-gray-200 rounded-full">
                    <Link
                      href={"/profile"}
                      className="flex justify-center items-center"
                    >
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
                    </Link>
                  </button>
                  <p className="text-white">
                    {review.user.firstName + " " + review.user.lastName}
                  </p>
                </div>
                <div className="flex">{Stars(review.stars)}</div>
              </div>
              <p>{review.comment}</p>
              <Likes id={review.id} pathname={pathname} />
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
