import Link from "next/link";

export default function LastCTA() {
  return (
    <div className="flex flex-col items-center gap-12">
      <h1 className="text-3xl sm:text-5xl font-bold text-center">
        Join The Reading Revolution Today!
      </h1>
      <button className="bg-green-600 max-w-fit rounded-3xl hover:bg-green-700">
        <Link href="/signup">
          <h2 className="p-4 tracking-wider">Join For Free</h2>
        </Link>
      </button>
    </div>
  );
}
