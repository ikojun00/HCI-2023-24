import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import CircleReadingProgress from "./CircleReadingProgress";
import { toast } from "react-toastify";
import DashboardSectionTitle from "./DashboardSectionTitle";

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

export default function UserOverview({ session }: Props) {
  const [yearlyReadingGoal, setYearlyReadingGoal] = useState<number>(0);
  const [booksReadThisYear, setBooksReadThisYear] = useState<number>(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${Backend_URL}/users/readingGoal`, {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        });
        if (response.data.readingGoal) {
          console.log(response.data.readingGoal);
          console.log(typeof response.data.readingGoal);
          setYearlyReadingGoal(response.data.readingGoal);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
      }
    })();
  }, [session, session?.backendTokens.accessToken]);

  return (
    <section className="px-2">
      {/* Section title and line below */}
      <DashboardSectionTitle
        sectionName={`${session.user.firstName}'s overview`}
      />

      <div className="flex gap-20 justify-between items-center">
        {/* Circle for progress */}

        <div className="w-64 h-64 flex justify-center items-center">
          <CircleReadingProgress
            circleWidthRem={15}
            yearlyReadingGoal={yearlyReadingGoal}
            booksReadThisYear={booksReadThisYear}
          />
        </div>

        {/* Section with current read, recently read and recently added */}
        <div className="grow flex justify-between">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-40 flex flex-col gap-2">
              <div className="w-full h-60 border-white border-2">
                <Image
                  src="/tomor.jpg"
                  alt="book"
                  width={150}
                  height={250}
                  className="w-full h-full"
                />
              </div>
              <p className="uppercase text-base">Current read</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
