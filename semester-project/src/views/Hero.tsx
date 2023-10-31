import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col items-start max-w-5xl mx-auto gap-5 text-white">
      <div className="flex flex-row gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl sm:text-5xl font-bold">
            Connecting Bookworms Worldwide.
          </h1>
          <h2 className="text-lg sm:text-xl font-medium">
            Easily keep tabs on every book, share them with the world and
            uncover life-altering reads.
          </h2>
          <button className="bg-green-600 max-w-fit rounded-3xl hover:bg-green-700">
            <Link href="/signup">
              <h2 className="p-4 tracking-wider">Join For Free</h2>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}