import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import SetReadingGoalImage from "../../../public/SetReadingGoalImage";

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

export default function ReadingGoalTab({ session }: Props) {
  const [goal, setGoal] = useState(1);

  const handleNewGoal = (newGoal: number) => {
    if (newGoal <= 0) {
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

  return (
    <div className="flex flex-col gap-16 md:gap-0 md:flex-row md:justify-around">
      <div className="flex flex-col items-center justify-center">
        <p className="uppercase text-sm md:text-base text-gray-200 text-center">
          Choose your yearly reading goal
        </p>

        <div className="my-8 h-20 w-48 lg:w-56 text-2xl lg:text-3xl bg-gray-200 text-bv-blue-dark flex items-center justify-center rounded-lg shadow-2xl">
          <span
            className="w-full text-center font-semibold cursor-pointer"
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
            className="w-full text-center font-semibold border-0 appearance-none outline-none focus:outline-none focus:border-bv-purple focus:transition-all focus:duration-300 border-x-2 border-gray-400 bg-transparent"
          />
          {/* <span className="w-full text-center text-4xl font-semibold border-x-2 border-gray-400 pointer-events-none">
              {goal}
            </span> */}
          <span
            className="w-full text-center font-semibold cursor-pointer"
            onClick={() => handleNewGoal(goal + 1)}
          >
            +
          </span>
        </div>

        <button
          onClick={handleSaveGoal}
          className="bg-bv-green hover:bg-bv-green-dark text-sm md:text-base cursor-pointer font-medium flex justify-between items-center rounded-lg py-2.5 px-3 transition-all duration-300"
        >
          Set Goal
        </button>
      </div>
      <div className="flex justify-center ">
        <SetReadingGoalImage />
      </div>
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
        </div>
         */
  );
}
