import { useRef } from "react";
import CloseButton from "./icons/CloseButton";
import axios from "axios";
import { Backend_URL } from "@/lib/constants";
import { useSession } from "next-auth/react";

interface Props {
  handleReview: () => void;
  pathname: string;
  isModify?: boolean; // Add a prop to determine whether it's a modify or post
}

type FormInputs = {
  comment: string;
  stars: number;
};

export default function PostModifyReview({
  handleReview,
  pathname,
  isModify,
}: Props) {
  const { data: session, status } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios[isModify ? "patch" : "post"](
        `${Backend_URL}/review/${pathname}`,
        {
          comment: data.current.comment,
          stars: data.current.stars,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );

      window.location.reload();
      alert(isModify ? "Review modified!" : "Review posted!");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const data = useRef<FormInputs>({
    comment: "",
    stars: 1,
  });

  return (
    <div>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="flex flex-col border-2 rounded-md w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 mx-auto bg-slate-800">
          <div className="flex justify-end">
            <button className="text-white m-6 md:m-8" onClick={handleReview}>
              <CloseButton />
            </button>
          </div>
          <div className="flex items-center flex-col">
            <form onSubmit={handleSubmit} className="space-y-6 w-10/12">
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6"
                >
                  Comment
                </label>
                <div className="mt-2">
                  <textarea
                    id="comment"
                    name="comment"
                    required
                    onChange={(e) => (data.current.comment = e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-black pl-2 placeholder:text-gray-400"
                  ></textarea>
                </div>
              </div>

              <div>
                <label
                  htmlFor="stars"
                  className="block text-sm font-medium leading-6"
                >
                  Rating
                </label>
                <div className="mt-2">
                  <select
                    id="stars"
                    name="stars"
                    required
                    onChange={(e) =>
                      (data.current.stars = parseInt(e.target.value, 10))
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-black pl-2"
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex justify-center text-center bg-green-500 py-2 px-8 mt-10 rounded-xl hover:bg-green-600 tracking-wider"
                >
                  {isModify ? "Modify" : "Post"}
                </button>
              </div>
            </form>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
