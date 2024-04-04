import React from "react";

interface Props {
  progress: number;
  circleWidthRem: number;
}
const CircleReadingProgress = ({ progress, circleWidthRem }: Props) => {
  const circleWidth = circleWidthRem * 16;
  const radius = circleWidth / 2 - 8;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * progress) / 100;
  return (
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
          className="text-4xl font-semibold fill-gray-200"
        >
          {progress}%
        </text>
        <text
          x="50%"
          y="55%"
          dy="0.3rem"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-base fill-gray-400"
        >
          12 books left
        </text>
      </svg>
    </div>
  );
};

export default CircleReadingProgress;
