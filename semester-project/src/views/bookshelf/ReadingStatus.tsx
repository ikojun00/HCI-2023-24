import Pencil from "@/components/icons/Pencil";
import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChangeReadingStatus from "./ChangeReadingStatus";

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
  pages: number;
}

export default function ReadingStatus({ session, bookId, pages }: Props) {
  const [data, setData] = useState<number>();
  const [showModifyReadingStatus, setShowModifyReadingStatus] = useState(false);

  // mora se updejtat reading status kad se promijeni

  const handleShowModifyReadingStatus = () => {
    setShowModifyReadingStatus(!showModifyReadingStatus);
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
        <div className="flex items-center gap-2">
          {showModifyReadingStatus !== true ? (
            <>
              <div className="w-full bg-gray-700 rounded-full">
                <div
                  style={{ width: `${data}%` }}
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                >
                  {data}%
                </div>
              </div>
              <button
                onClick={handleShowModifyReadingStatus}
                className="scale-75"
              >
                <Pencil />
              </button>
            </>
          ) : (
            <ChangeReadingStatus
              bookId={bookId}
              pages={pages}
              handleShowModifyReadingStatus={handleShowModifyReadingStatus}
              session={session}
            />
          )}
        </div>
      )}
    </div>
  );
}
