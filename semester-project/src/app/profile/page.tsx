"use client";

import Spinner from "@/components/icons/Spinner";
import { Backend_URL } from "@/lib/constants";
import Bookshelf from "@/views/bookshelf/Bookshelf";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const { data: session, status } = useSession();
  const [bookshelfNumber, setBookshelf] = useState(1);
  const [tab, setTab] = useState("bookshelves");
  const [goal, setGoal] = useState(1);

  const handleNewGoal = (newGoal: number) => {
    if (newGoal < 0) {
      return;
    }
    setGoal(newGoal);
  };

  const handleSaveGoal = async () => {
    if (goal <= 0 || Number.isNaN(goal)) {
      //Set a message underneath that says "You goal must be greater than 0"
      console.log("Must be a number over 0");
      return;
    }
    try {
      await axios.patch(
        `${Backend_URL}/users/readingGoal`,
        {
          readingGoal: goal,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      toast.success("Reading goal changed!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex h-[calc(100vh-78px)] justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return session && session.user ? (
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6">
      <div className="flex flex-col gap-4 items-center py-16">
        <p>{session.user.firstName}</p>
        <p>{session.user.email}</p>
        <button className="text-red-600" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
      <div className="flex gap-6 border-b">
        <button
          onClick={() => setTab("bookshelves")}
          className={`text-sm md:text-base ${
            bookshelfNumber === 1 ? "border-yellow-400" : "border-slate-800"
          } border-b-2`}
        >
          Bookshelves
        </button>
        <button
          onClick={() => setTab("readingGoal")}
          className={`text-sm md:text-base ${
            bookshelfNumber === 1 ? "border-yellow-400" : "border-slate-800"
          } border-b-2`}
        >
          Reading Goal
        </button>
      </div>
      {tab == "bookshelves" && (
        <>
          <div className="flex gap-6 border-b">
            <button
              onClick={() => setBookshelf(1)}
              className={`text-sm md:text-base ${
                bookshelfNumber === 1 ? "border-yellow-400" : "border-slate-800"
              } border-b-2`}
            >
              Currently reading
            </button>
            <button
              onClick={() => setBookshelf(2)}
              className={`text-sm md:text-base ${
                bookshelfNumber === 2 ? "border-yellow-400" : "border-slate-800"
              } border-b-2`}
            >
              Read
            </button>
            <button
              onClick={() => setBookshelf(3)}
              className={`text-sm md:text-base ${
                bookshelfNumber === 3 ? "border-yellow-400" : "border-slate-800"
              } border-b-2`}
            >
              Want to read
            </button>
          </div>
          <Bookshelf session={session} bookshelfNumber={bookshelfNumber} />
        </>
      )}
      {tab == "readingGoal" && (
        <div className="flex flex-col items-center justify-center mt-36">
          <p className="text-xl">Choose your yearly reading goal!</p>
          <div className="my-8 w-60 h-24 bg-gray-300 text-black flex items-center justify-center rounded-sm shadow-2xl">
            <span
              className="w-full text-center  text-bv-blue text-4xl font-semibold cursor-pointer"
              onClick={() => handleNewGoal(goal - 1)}
            >
              -
            </span>
            <input
              type="number"
              value={goal}
              onChange={(e) => {
                handleNewGoal(parseInt(e.target.value));
              }}
              onWheel={(e) => e.preventDefault()} // Prevent mouse wheel from changing the value
              min={1}
              className="w-full text-center text-4xl font-semibold border-0 appearance-none outline-none focus:outline-none focus:border-bv-purple focus:transition-all focus:duration-300 border-x-2 border-gray-400 bg-transparent"
            />
            {/* <span className="w-full text-center text-4xl font-semibold border-x-2 border-gray-400 pointer-events-none">
              {goal}
            </span> */}
            <span
              className="w-full text-center text-bv-blue text-4xl font-semibold cursor-pointer"
              onClick={() => handleNewGoal(goal + 1)}
            >
              +
            </span>
          </div>
          <button className="" onClick={handleSaveGoal}>
            Set Goal
          </button>
        </div>
        /* <div className="flex justify-center items-center my-32">
          <form onSubmit={handleSubmit} className="text-center">
            <label htmlFor="goal" className="block mb-4">
              Choose your reading goal:
            </label>
            <input
              type="number"
              id="goal"
              name="goal"
              value={goal}
              min={0}
              onChange={handleChange}
              className="w-32 px-3 py-2 border rounded-md text-center text-black mr-4"
              placeholder="Enter goal"
              required
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Set Goal
            </button>
          </form>
        </div> */
      )}
    </div>
  ) : (
    <div>No data.</div>
  );
}
