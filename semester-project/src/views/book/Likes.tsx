import HandleUpvote from "@/components/HandleUpvote";
import Spinner from "@/components/icons/Spinner";
import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  pathname: string;
};

export default function Likes({ id, pathname }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get(`${Backend_URL}/review/${pathname}/${id}`);
      setLikes(res.data);
      setLoading(false);
    })();
  }, [id, pathname]);

  return (
    <div className="flex gap-2">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <HandleUpvote id={id} pathname={pathname} />
          <div>{likes}</div>
        </>
      )}
    </div>
  );
}
