import { useState } from "react";
import Bookshelf from "@/views/bookshelf/Bookshelf";

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
}

const bookshelfTabOptions = [
  {
    title: "Currently reading",
    id: 1,
  },
  {
    title: "Read",
    id: 2,
  },
  {
    title: "Want to read",
    id: 3,
  },
];

export default function SelectBookshelfTab({ session }: Props) {
  const [bookshelfNumber, setBookshelf] = useState(bookshelfTabOptions[0].id);
  return (
    <>
      {/* Tabs */}
      <div className="flex gap-6 border-b">
        {bookshelfTabOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setBookshelf(option.id)}
            className={`text-sm md:text-base ${
              bookshelfNumber === option.id
                ? "border-yellow-400"
                : "border-slate-800"
            } border-b-2`}
          >
            {option.title}
          </button>
        ))}
      </div>

      {/* Content of the selected tab */}
      <Bookshelf session={session} bookshelfNumber={bookshelfNumber} />
    </>
  );
}
