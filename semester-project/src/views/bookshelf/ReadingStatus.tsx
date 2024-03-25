import Checkmark from "@/components/icons/Checkmark";
import CloseButton from "@/components/icons/CloseButton";
import Pencil from "@/components/icons/Pencil";
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
  pages: number;
}

export default function ReadingStatus({ session, bookId, pages }: Props) {
  const [data, setData] = useState<number>();
  const [page, setPage] = useState<number>(0);
  const [showModifyReadingStatus, setShowModifyReadingStatus] = useState(false);

  const handleChangingReadingStatus = async () => {
    try {
      const value = ((page / pages) * 100).toFixed();
      await axios.post(
        `${Backend_URL}/bookshelf/${bookId}/reading`,
        {
          completion_percentage: parseInt(value),
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      toast.success("Reading status changed!");
      handleShowModifyReadingStatus();
      setData(parseInt(value));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const handleShowModifyReadingStatus = () =>
    setShowModifyReadingStatus(!showModifyReadingStatus);

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
        setData(response.data.completion_percentage);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    })();
  }, [bookId, pages, session?.backendTokens.accessToken]);
  return (
    <div>
      {data !== undefined && (
        <div className="flex items-center gap-2">
          {showModifyReadingStatus !== true ? (
            <>
              <div className="w-32 md:w-96 bg-gray-700 rounded-full">
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
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={page}
                  min={0}
                  max={pages}
                  className="pl-2 text-sm md:text-base w-8 md:w-16 bg-gray-700"
                  onChange={(e) => setPage(parseInt(e.target.value))}
                />
                <p className="text-sm md:text-base">of {pages} pages</p>
              </div>
              <div className="flex justify-center gap-6">
                <button onClick={handleChangingReadingStatus}>
                  <Checkmark />
                </button>
                <button
                  className="md:scale-75"
                  onClick={handleShowModifyReadingStatus}
                >
                  <CloseButton />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
