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
      "Let your virtual library become a testament to your literary journey.",
    ],
    imageElement: <BenefitsCardImage1 />,
  },
  {
    title: "Keep track of your books like never before",
    subtitle:
      "BookVoyage is built to handle all libraries, from the smallest to the most complex.",
    bulletpoints: [
      "Track status for every book.",
      "Track progress on your currently read book(s).",
      "Give rating(s) in star increments.",
    ],
    imageElement: <BenefitsCardImage2 />,
  },
  {
    title: "Community Reviews and Tracking",
    subtitle: "Engage, Review, and Keep Track of Your Reading Journey.",
    bulletpoints: [
      "Join a community of avid readers sharing their thoughts and experiences.",
      "Leave reviews and ratings for the books you've explored.",
    ],
    imageElement: <BenefitsCardImage3 />,
  },
];

export default function Benefits() {
  return (
    <div className="flex flex-col gap-32">
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
