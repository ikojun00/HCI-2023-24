import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
  totalBooksRead: number;
}
export default function CircleReadingProgress({
  session,
  totalBooksRead,
}: Props) {
  const [yearlyReadingGoal, setYearlyReadingGoal] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const progressValue = (totalBooksRead / yearlyReadingGoal) * 100;

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
          setYearlyReadingGoal(response.data.readingGoal);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
      }
    })();
  }, [session, session?.backendTokens.accessToken]);

  useEffect(() => {
    if (progress < progressValue && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= progressValue ? progressValue : prevProgress + 1
        );
      }, 30);

      return () => clearInterval(interval);
    }
  }, [progressValue, progress]);
  const widthValue = 200;
  const circleWidth = widthValue - 15;
  const radius = circleWidth / 2 - 8;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * progress) / 100;
  return (
    <div className="w-64 h-64 flex justify-center items-center">
      <div>
        <svg
          width={circleWidth}
          height={circleWidth}
          viewBox={`0 0 ${circleWidth} ${circleWidth}`}
        >
          <circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            strokeWidth="15px"
            r={radius}
            className="fill-none stroke-gray-300"
          />

          <circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            strokeWidth="15px"
            r={radius}
            className="fill-none stroke-bv-purple"
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
            transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
          />

          <text
            x="50%"
            y="45%"
            dy="0.3rem"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-3xl font-semibold fill-gray-200"
          >
            {` ${progress < 100 ? `${progress}%` : "🥳"} `}
          </text>
          <text
            x="50%"
            y="55%"
            dy="0.3rem"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-base fill-gray-400"
          >
            {` ${
              progressValue < 100
                ? `${yearlyReadingGoal - totalBooksRead} books left`
                : "Goal reached!!"
            } `}
          </text>
        </svg>
      </div>
    </div>
  );
}
