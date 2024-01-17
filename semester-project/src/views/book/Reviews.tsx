"use client";

import GreyStar from "@/components/icons/GreyStar";
import Spinner from "@/components/icons/Spinner";
import YellowStar from "@/components/icons/YellowStar";
import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Reviews({ pathname }: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<any>([]);

  function Stars(num: number) {
    const array = [];
    let i = 0;
    while (i < 5) {
      i < num ? array.push(<YellowStar />) : array.push(<GreyStar />);
      i += 1;
    }
    return array;
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get(`${Backend_URL}/review/${pathname}`);
      console.log(res.data);
      setReviews(res.data);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 className="text-3xl font-bold">Reviews</h1>
      <hr />
      <br />
      <br />
      {loading ? (
        <Spinner />
      ) : reviews.length === 0 ? (
        <p>No reviews.</p>
      ) : (
        reviews.map((review: any, index: number) => (
          <div
            className="flex flex-col gap-10 max-w-screen-xl mx-auto"
            key={index}
          >
            <div className="flex flex-row justify-between">
              <div className="flex gap-1">
                <p className="font-bold">{review.user.firstName}</p>
                <p className="font-bold">{review.user.lastName}</p>
              </div>
              <div className="flex">{Stars(review.stars)}</div>
            </div>
            <p className="text-xl">{review.comment}</p>
            <hr />
            <br />
          </div>
        ))
      )}
    </div>
  );
}
