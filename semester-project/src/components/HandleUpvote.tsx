"use client";

import { useSession } from "next-auth/react";
import Heart from "./icons/Heart";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Backend_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import HeartFill from "./icons/HeartFill";

type Props = {
  id: number;
  pathname: string;
};

export default function HandleUpvote({ id, pathname }: Props) {
  const { data: session, status } = useSession();
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (session && session.user) {
        try {
          const res = await axios.get(
            `${Backend_URL}/review/${pathname}/upvote/${id}`,
            {
              headers: {
                Authorization: `Bearer ${session?.backendTokens.accessToken}`,
              },
            }
          );
          setUpvoted(res.data);
        } catch (error) {
          console.error("Error handling upvote:", error);
        }
      }
    })();
  }, [id, pathname, session?.backendTokens.accessToken, session]);

  const handleLike = async () => {
    if (status !== "authenticated") router.push("/signin");
    try {
      const res = await axios.patch(
        `${Backend_URL}/review/${pathname}/upvote/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      setUpvoted(res.data.upvoted);
    } catch (error) {
      console.error("Error handling upvote:", error);
    }
  };

  return (
    <div>
      <button className="flex items-center" onClick={handleLike}>
        {upvoted === true ? <HeartFill /> : <Heart />}
      </button>
    </div>
  );
}
