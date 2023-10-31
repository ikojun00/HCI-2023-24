export default function Feature() {
  return (
    <div className="flex gap-24 w-full">
      <div className="w-1/3">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg sm:text-xl font-bold">
            🔭 Discover New Reads
          </h2>
          <p>
            Personalized book recommendations based on user preferences and
            reading history and extensive categorization of books by genre.
          </p>
        </div>
      </div>
      <div className="w-1/3">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg sm:text-xl font-bold">❉ Reading Challenges</h2>
          <p>
            Set reading challenges to meet personal goals and visualize your
            progress.
          </p>
        </div>
      </div>
      <div className="w-1/3">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg sm:text-xl font-bold">
            ✉ Community Interaction
          </h2>
          <p>
            Participate in discussions, forums and community activities. Share
            personal reviews and ratings for books.
          </p>
        </div>
      </div>
    </div>
  );
}
