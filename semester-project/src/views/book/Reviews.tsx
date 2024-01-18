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

type Props = {
  pathname: string;
};

export default function Reviews({ pathname }: Props) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<any>([]);

  const Stars = (num: number) => {
    const starArray = Array.from({ length: 5 }, (_, index) =>
      index < num ? <YellowStar key={index} /> : <GreyStar key={index} />
    );

    return starArray;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get(`${Backend_URL}/review/${pathname}`);
      /*console.log(session);
      const result = res.data.filter(({ id }) => id === session?.user.id);
      console.log(result)*/
      setReviews(res.data);
      setLoading(false);
    })();
  }, [pathname, session]);

  return (
    <div>
      <h1 className="text-3xl font-bold">All Reviews</h1>
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
  );
}
