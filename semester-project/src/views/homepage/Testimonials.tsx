import Image from "next/image";
import TestimonialCard from "./TestimonialCard";
export const testimonials = [
  {
    name: "Sarah",
    occupation: "High School English Teacher",
    image: "/sarah.webp",
    text: "\"As an avid reader, I have always been on the lookout for a platform that connects me with a passionate reading community. BookVoyage does just that and more. I can not imagine my reading life without it!\"",
  },
  {
    name: "Mark",
    occupation: "Software Engineer",
    image: "/mark.webp",
    text: "\"It is like having a personal librarian at my fingertips. The recommendations are spot-on and the reading challenges keep me motivated. Plus, the author spotlights and book quotes add a whole new dimension to my reading journey. Highly recommended.\"",
  },
  {
    name: "Lisa",
    occupation: "Homemaker",
    image: "/lisa.webp",
    text: "\"Discovering books and connecting with fellow readers has never been so effortless. I have expanded my reading list, found incredible book clubs and even swapped books with like-minded readers. This platform has truly enriched my reading experience.\"",
  },
];
export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 overflow-hidden">
      {testimonials.map((item) => (
        <TestimonialCard  key={item.name} {...item} />
      ))}
    </div>
  );
}
