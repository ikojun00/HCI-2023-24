import Navbar from "@/components/Navbar";
import Image from "next/image";

interface Params {
  title: string;
  author: string;
  description: string;
  cover: string;
}

interface BookParams {
  searchParams: Params;
}

export default function BlogPost({ searchParams }: BookParams) {
  return (
    <main className="flex flex-col">
      <br />
      <br />
      <br />
      <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex flex-row p-4">
          <Image
            src={searchParams.cover}
            alt="Cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "300px" }}
          />
          <div className="flex flex-col pl-8 gap-4">
            <h1 className="text-3xl font-bold">{searchParams.title}</h1>
            <div className="flex flex-row gap-1 items-center">
              <h1>By:</h1>
              <h1 className="text-xl font-bold">{searchParams.author}</h1>
            </div>
            <br />
            <p>{searchParams.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
