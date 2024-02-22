import BenefitsCard from "./BenefitsCard";
import BenefitsCardImage1 from "../../../public/benefitsImages/BenefitsCardImage1";
import BenefitsCardImage2 from "../../../public/benefitsImages/BenefitsCardImage2";
import BenefitsCardImage3 from "../../../public/benefitsImages/BenefitsCardImage3";

const benefits = [
  {
    title: "Create Your Virtual Reading Haven",
    subtitle: "Build Your Digital Library and Organize Your Reads.",
    bulletpoints: [
      "Craft a personalized reading space with our virtual bookshelves.",
      "Tag, categorize, and arrange titles to suit your preferences.",
      "Share your curated shelves with the community.",
      "Let your virtual library become a testament to your literary journey.",
    ],
    imageElement: <BenefitsCardImage1 />,
  },
  {
    title: "Keep track of your books like never before",
    subtitle:
      "BookVoyage is built to handle all libraries, from the smallest to the most complex. You can track:",
    bulletpoints: [
      "Your status for every book.",
      "Progress on your current book(s).",
      "Your rating in star increments.",
      "Your review.",
      "Any number of lists for each book.",
    ],
    imageElement: <BenefitsCardImage2 />,
  },
  {
    title: "Community Reviews and Tracking",
    subtitle: "Engage, Review, and Keep Track of Your Reading Journey.",
    bulletpoints: [
      "Join a community of avid readers sharing their thoughts and experiences.",
      "Leave reviews and ratings for the books you've explored.",
      "Create a digital journal of your literary endeavors.",
      "Build a reading history that reflects your unique taste in literature.",
    ],
    imageElement: <BenefitsCardImage3 />,
  },
];

export default function Benefits() {
  return (
    <div className="flex flex-col gap-24">
      {benefits.map((item, index) => (
        <BenefitsCard
          key={item.title}
          reversed={index % 2 ? true : false}
          {...item}
        />
      ))}
    </div>
  );
}
