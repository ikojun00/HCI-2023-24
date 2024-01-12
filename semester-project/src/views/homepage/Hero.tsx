import Link from "next/link";
import Button from "../navbar/Button";

export default function Hero() {
  return (
    <div className="flex flex-col items-start max-w-5xl mx-auto gap-5 text-white">
      <div className="flex flex-row gap-5">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-3xl sm:text-5xl font-bold text-center">
            Connecting Bookworms Worldwide.
          </h1>
          <h2 className="text-md sm:text-lg font-medium text-center">
            Easily keep tabs on every book, share them with the world and
            uncover life-altering reads.
          </h2>
          <Button title={"Join For Free"} link={"/signup"} />
        </div>
      </div>
    </div>
  );
}
