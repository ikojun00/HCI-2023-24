import Image from "next/image";

export interface TestimonialCardProps{
    name: string,
    occupation:string,
    image: string,
    text: string
}

export default function TestimonialCard({name, occupation, image, text}:TestimonialCardProps) {
  return (
    <div className="flex flex-col justify-between gap-16 p-6 border-4">
      <p className="text-sm md:text-base">
        {text}
      </p>
      <div>
        <Image
          src={image}
          alt="Profile"
          className="rounded-full mb-2"
          width={50}
          height={50}
        />
        <p className="font-bold text-sm md:text-base">{name}</p>
        <p className="text-sm md:text-base">{occupation}</p>
      </div>
    </div>
  );
}
