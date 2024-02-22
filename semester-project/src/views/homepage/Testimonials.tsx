import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import Previous from "@/components/icons/Previous";
import Next from "@/components/icons/Next";

export const testimonials = [
  {
    name: "Sarah",
    occupation: "High School English Teacher",
    image: "/sarah.webp",
    text: '"As an avid reader, I have always been on the lookout for a platform that connects me with a passionate reading community. BookVoyage does just that and more. I can not imagine my reading life without it!"',
  },
  {
    name: "Mark",
    occupation: "Software Engineer",
    image: "/mark.webp",
    text: '"It is like having a personal librarian at my fingertips. The recommendations are spot-on and the reading challenges keep me motivated. Plus, the author spotlights and book quotes add a whole new dimension to my reading journey. Highly recommended."',
  },
  {
    name: "Lisa",
    occupation: "Homemaker",
    image: "/lisa.webp",
    text: '"Discovering books and connecting with fellow readers has never been so effortless. I have expanded my reading list, found incredible book clubs and even swapped books with like-minded readers. This platform has truly enriched my reading experience."',
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="bg-slate-700 rounded-lg p-4 m-4">
      <div className="flex gap-8">
        <div className="flex items-center">
          <button
            onClick={() => setCurrentSlide((currentSlide + 2) % 3)}
            className="p-4"
          >
            <Previous />
          </button>
        </div>

        {testimonials.map((item, index) => (
          <div
            key={item.name}
            className={`${index === currentSlide ? "block" : "hidden"}`}
          >
            <TestimonialCard {...item} />
          </div>
        ))}
        <div className="flex items-center">
          <button
            onClick={() => setCurrentSlide((currentSlide + 1) % 3)}
            className="p-4"
          >
            <Next />
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 py-4">
        {testimonials.map((_, index) => (
          <div key={index}>
            <button
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-black" : "bg-slate-500"
              }`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
}
