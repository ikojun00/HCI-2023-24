import Link from "next/link";
import Button from "../navbar/Button";

export default function DiscoverCTA() {
  return (
    <div className="flex flex-col items-center gap-12 p-4 my-16">
      <h1 className="text-3xl sm:text-5xl font-bold text-center">
        Discover More Books Today!
      </h1>
      <Button title={"Discover"} link={"/discover"} />
    </div>
  );
}