import Arrow from "@/components/icons/Arrow";
import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  bookId: Number;
}

export default function ButtonAddBook({ session, bookId }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Number>(0);
  // bookshelf code - 1 - Currently Reading, 2 - Read, 3 - Want to Read

  const handleSubmit = async (shelfId: Number) => {
    try {
      await axios.post(
        `${Backend_URL}/bookshelf/${bookId}`,
        {
          shelfId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      toast.success("Bookshelf updated!");
    } catch (error) {
      setSelectedOption(0);
      toast.error(error.response?.data?.message);
    }
  };

  const handleOptionClicked = (optionId: Number) => {
    setIsOpen(false);
    setSelectedOption(optionId);
    session && session.user ? handleSubmit(optionId) : router.push("/signin");
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(`${Backend_URL}/bookshelf/${bookId}`, {
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      const myShelf = response.data.shelfId ? response.data.shelfId : 0;

      setSelectedOption(myShelf);
      setLoading(false);
    })();
  }, [bookId, session, session?.backendTokens.accessToken]);

  const handleDropdownClick = () => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
  };

  return (
    <div className="w-44 relative mt-3">
      <div
        onClick={handleDropdownClick}
        className="bg-green-600 font-medium flex justify-between items-center rounded-lg py-2.5 px-3 cursor-pointer transition-all hover:bg-green-700 duration-300"
      >
        <span>
          {selectedOption === 1
            ? "Currently Reading"
            : selectedOption === 2
            ? "Read"
            : selectedOption === 3
            ? "Want to Read"
            : "Add to Shelf"}
        </span>
        <div>
          <Arrow active={isOpen ? true : false} />
        </div>
      </div>
      <ul
        className={`list-none bg-green-600 rounded-lg shadow-md absolute top-11 left-1/2 w-full -translate-x-1/2 ${
          isOpen ? "block opacity-100" : "opacity-0 hidden"
        } transition-all duration-500 z-10`}
      >
        <li
          onClick={() => handleOptionClicked(1)}
          className={`py-2 px-3 cursor-pointer hover:bg-green-400 ${
            selectedOption === 1 && "bg-green-500"
          }`}
        >
          Currently Reading
        </li>
        <li
          onClick={() => handleOptionClicked(2)}
          className={`py-2 px-3 rounded-b-lg cursor-pointer hover:bg-green-400 ${
            selectedOption === 2 && "bg-green-500"
          }`}
        >
          Read
        </li>
        <li
          onClick={() => handleOptionClicked(3)}
          className={`py-2 px-3 rounded-t-lg cursor-pointer hover:bg-green-400 ${
            selectedOption === 3 && "bg-green-500"
          }`}
        >
          Want to Read
        </li>
      </ul>
    </div>
  );
}
