import Image from "next/image";
import Button from "../navbar/Button";
import HeroIcon from "@/components/icons/HeroIcon";

export default function Hero() {
  return (
    <div className="flex flex-col gap-5 text-white">
      <div className="flex flex-col lg:flex-row justify-between gap-16">
        <div className="w-full lg:w-3/5 flex justify-center lg:block">
          <HeroIcon />
        </div>
        <div className="flex flex-col items-center lg:justify-center lg:items-start gap-5">
          <h1 className="text-3xl sm:text-5xl font-bold text-center lg:text-start">
            Connecting Bookworms Worldwide.
          </h1>
          <h2 className="text-md sm:text-lg font-medium text-center lg:text-start">
            Easily keep tabs on every book, share them with the world and
            uncover life-altering reads.
          </h2>
          <Button title={"Join For Free"} link={"/signup"} />
        </div>
      </div>
    </div>
  );
}
