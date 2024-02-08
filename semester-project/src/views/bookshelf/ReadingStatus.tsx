import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Session {
  user: { id: number; email: string; firstName: string };
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

interface Props {
  session: Session;
  bookId: number;
}

export default function ReadingStatus({ session, bookId }: Props) {
  const [data, setData] = useState<number>();
  const handleChangingReadingStatus = async () => {
    try {
      await axios.post(
        `${Backend_URL}/bookshelf/${bookId}/reading`,
        {
          percentage: data,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      toast.success("Reading status changed!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${Backend_URL}/bookshelf/${bookId}/reading`,
          {
            headers: {
              Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          }
        );
        setData(response.data.percentage);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    })();
  }, [bookId, session?.backendTokens.accessToken]);
  return (
    <div>
      {data !== undefined && (
        <div className="flex items-start flex-col gap-2">
          <div className="flex gap-4">{data}%</div>
          <input
            type="range"
            value={data}
            className="w-full h-2 rounded-lg appearance-none cursor-pointerbg-gray-700"
            onChange={(e) => setData(parseInt(e.target.value))}
          />
          <button onClick={handleChangingReadingStatus}>Save</button>
        </div>
      )}
    </div>
  );
}
