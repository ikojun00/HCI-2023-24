import axios from "axios";
import { useState } from "react";
import { Backend_URL } from "@/lib/constants";
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
  handleShowModifyReadingStatus: () => void;
}

export default function ChangeReadingStatus({
  session,
  bookId,
  pages,
  handleShowModifyReadingStatus,
}: Props) {
  const [data, setData] = useState<number>(1);

  const handleChangingReadingStatus = async () => {
    try {
      const value = ((data / pages) * 100).toFixed();
      await axios.post(
        `${Backend_URL}/bookshelf/${bookId}/reading`,
        {
          percentage: parseInt(value),
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      toast.success("Reading status changed!");
      handleShowModifyReadingStatus();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div className="flex gap-4">
      <input
        type="number"
        value={data}
        min={0}
        max={pages}
        className="w-16 bg-gray-700"
        onChange={(e) => setData(parseInt(e.target.value))}
      />
      <p>of {pages}</p>
      <button onClick={handleChangingReadingStatus}>Save</button>
    </div>
  );
}
