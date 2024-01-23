import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  pathname: string;
}

export default function AddBookOnBookshelf({ pathname }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookStatus, setBookStatus] = useState("Select Book Status");

  const handleSubmit = async (shelfId: number) => {
    try {
      await axios.post(
        `${Backend_URL}/bookshelf/${pathname}`,
        {
          shelfId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      if (shelfId === 1) setBookStatus("Currently Reading");
      else if (shelfId === 2) setBookStatus("Read");
      else if (shelfId === 3) setBookStatus("Want To Read");
      alert("Bookshelf updated!");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    (async () => {
      if (session && session.user) {
        try {
          const response = await axios.get(
            `${Backend_URL}/bookshelf/${pathname}`,
            {
              headers: {
                Authorization: `Bearer ${session?.backendTokens.accessToken}`,
              },
            }
          );
          if (response.data.shelfId === 1) setBookStatus("Currently Reading");
          else if (response.data.shelfId === 2) setBookStatus("Read");
          else if (response.data.shelfId === 3) setBookStatus("Want To Read");
          else setBookStatus("Select Book Status");
        } catch (error) {
          alert(error.response?.data?.message);
        }
      }
    })();
  }, [pathname, session, session?.backendTokens.accessToken]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shelfId = Number(e.target.value);
    session && session.user ? handleSubmit(shelfId) : router.push("/signin");
  };

  return (
    <div className="mt-2">
      <select
        id="shelf"
        name="shelf"
        required
        onChange={handleSelectChange}
        className="block w-full rounded-md border-0 py-1.5 text-black pl-2"
      >
        <option value="">{bookStatus}</option>
        {bookStatus !== "Currently Reading" && (
          <option value="1">Currently Reading</option>
        )}
        {bookStatus !== "Read" && <option value="2">Read</option>}
        {bookStatus !== "Want To Read" && (
          <option value="3">Want To Read</option>
        )}
      </select>
    </div>
  );
}
