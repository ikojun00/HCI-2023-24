import Image from "next/image";

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 overflow-hidden">
      <div className="flex flex-col justify-between gap-16 p-6 border-4">
        <p className="text-xs sm:text-sm">
          &quot;As an avid reader, I have always been on the lookout for a
          platform that connects me with a passionate reading community.
          BookVoyage does just that and more. I can not imagine my reading life
          without it!&quot;
        </p>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1633421878789-30435a5f7ea8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl4ZWx8ZW58MHx8MHx8fDA%3D"
            alt="Profile"
            className="rounded-full mb-2"
            width={50}
            height={50}
          />
          <p className="font-bold text-xs sm:text-sm">Sarah</p>
          <p className="text-xs sm:text-sm">High School English Teacher</p>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-16 p-6 border-4">
        <p className="text-xs sm:text-sm">
          &quot;It is like having a personal librarian at my fingertips. The
          recommendations are spot-on and the reading challenges keep me
          motivated. Plus, the author spotlights and book quotes add a whole new
          dimension to my reading journey. Highly recommended.&quot;
        </p>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1633421878789-30435a5f7ea8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl4ZWx8ZW58MHx8MHx8fDA%3D"
            alt="Profile"
            className="rounded-full mb-2"
            width={50}
            height={50}
          />
          <p className="font-bold text-xs sm:text-sm">Mark</p>
          <p className="text-xs sm:text-sm">Software Engineer</p>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-16 p-6 border-4">
        <p className="text-xs sm:text-sm">
          &quot;Discovering books and connecting with fellow readers has never
          been so effortless. I have expanded my reading list, found incredible
          book clubs and even swapped books with like-minded readers. This
          platform has truly enriched my reading experience.&quot;
        </p>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1633421878789-30435a5f7ea8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl4ZWx8ZW58MHx8MHx8fDA%3D"
            alt="Profile"
            className="rounded-full mb-2"
            width={50}
            height={50}
          />
          <p className="font-bold text-xs sm:text-sm">Lisa</p>
          <p className="text-xs sm:text-sm">Homemaker</p>
        </div>
      </div>
    </div>
  );
}
