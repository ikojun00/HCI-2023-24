import QuotationMark from "@/components/icons/QuotationMark";
import Image from "next/image";

export interface TestimonialCardProps {
  name: string;
  occupation: string;
  image: string;
  text: string;
}

export default function TestimonialCard({
  name,
  occupation,
  image,
  text,
}: TestimonialCardProps) {
  return (
    <div className="flex flex-col justify-between gap-12 p-12">
      <QuotationMark />
      <p className="text-lg md:text-xl font-medium">{text}</p>
      <div className="flex justify-center items-center gap-4">
        <Image
          src={image}
          alt="Profile"
          className="rounded-full mb-2"
          width={50}
          height={50}
        />
        <p className="font-bold text-sm md:text-base">{name}</p>
        <p className="text-sm md:text-base text-slate-400">{occupation}</p>
      </div>
    </div>
  );
}
