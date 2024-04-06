import Image from "next/image";
import DashboardBookItem from "./DashboardBookItem";
import DashboardSectionTitle from "./DashboardSectionTitle";

interface Props {
  sectionName: string;
}

export default function DashboardBookSection({ sectionName }: Props) {
  return (
    <section className="px-2">
      {/* Section title and line below */}
      <DashboardSectionTitle sectionName={sectionName} />

      {/* Section with 5 newest books */}
      <div className="flex justify-between items-center">
        {[...Array(5)].map((_, index) => (
          <DashboardBookItem
            key={index}
            book={{
              bookId: 99,
              title: "Long book title title title",
              author: "Author Name",
              description: "Not important",
              pages: 19,
              cover: { url: "/tomor.jpg" },
            }}
          />
        ))}
      </div>
    </section>
  );
}
