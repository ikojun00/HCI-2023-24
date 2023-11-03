export default function Feature() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-hidden">
      <div className="flex flex-col gap-4 p-6 border-4">
        <h2 className="text-base sm:text-md font-bold">
          🔭 Discover New Reads
        </h2>
        <p className="text-xs sm:text-sm">
          Personalized book recommendations based on user preferences and
          reading history.
        </p>
      </div>
      <div className="flex flex-col gap-4 p-6 border-4">
        <h2 className="text-base sm:text-md font-bold">❉ Your book tracker</h2>
        <p className="text-xs sm:text-sm">
          Track every book by want to read, currently reading, read and did not
          finish.
        </p>
      </div>
      <div className="flex flex-col gap-4 p-6 border-4">
        <h2 className="text-base sm:text-md font-bold">
          ✉ Community Interaction
        </h2>
        <p className="text-xs sm:text-sm">
          Participate in discussions, forums and community activities. Share
          personal reviews and ratings for books.
        </p>
      </div>
      <div className="flex flex-col gap-4 p-6 border-4">
        <h2 className="text-base sm:text-md font-bold">❉ Reading Challenges</h2>
        <p className="text-xs sm:text-sm">
          Set reading challenges to meet personal goals and visualize your
          progress.
        </p>
      </div>
    </div>
  );
}
