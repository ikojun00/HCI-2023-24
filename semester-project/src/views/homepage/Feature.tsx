import Pencil from "@/components/icons/Pencil";
import Telescope from "@/components/icons/Telescope";
import Community from "@/components/icons/Community";
import Brain from "@/components/icons/Brain";

export default function Feature() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-hidden">
      <div className="flex flex-col gap-4 p-6 border-4">
        <h2 className="flex items-center gap-2 text-sm md:text-base font-bold">
          <Telescope /> Discover New Reads
        </h2>
        <p className="text-sm sm:text-md">
          Personalized book recommendations based on user preferences and
          reading history.
        </p>
      </div>
      <div className="flex flex-col gap-4 p-6 border-4">
        <h2 className="flex items-center gap-2 text-sm md:text-base font-bold">
          <Pencil /> Your book tracker
        </h2>
        <p className="text-sm sm:text-md">
          Track every book by want to read, currently reading, read and did not
          finish.
        </p>
      </div>
      <div className="flex flex-col gap-4 p-6 border-4">
        <h2 className="flex items-center gap-2 text-sm md:text-base font-bold">
          <Community /> Community Interaction
        </h2>
        <p className="text-sm sm:text-md">
          Participate in discussions, forums and community activities. Share
          personal reviews and ratings for books.
        </p>
      </div>
      <div className="flex flex-col gap-4 p-6 border-4">
        <h2 className="flex items-center gap-2 text-sm md:text-base font-bold">
          <Brain /> Reading Challenges
        </h2>
        <p className="text-sm sm:text-md">
          Set reading challenges to meet personal goals and visualize your
          progress.
        </p>
      </div>
    </div>
  );
}
