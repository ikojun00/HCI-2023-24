import Pencil from "@/components/icons/Pencil";
import Telescope from "@/components/icons/Telescope";
import Community from "@/components/icons/Community";
import Brain from "@/components/icons/Brain";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Discover New Reads",
    text: "Personalized book recommendations based on user preferences and reading history.",
    icon: <Telescope />,
  },
  {
    title: "Your book tracker",
    text: "Track every book by want to read, currently reading, read and did not finish.",
    icon: <Pencil />,
  },
  {
    title: "Community Interaction",
    text: "Participate in discussions, forums and community activities. Share personal reviews and ratings for books.",
    icon: <Community />,
  },
  {
    title: "Reading Challenges",
    text: "Set reading challenges to meet personal goals and visualize your progress.",
    icon: <Brain />,
  },
];

export default function Feature() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden">
      {features.map((item) => (
        <FeatureCard key={item.title} {...item} />
      ))}
    </section>
  );
}
