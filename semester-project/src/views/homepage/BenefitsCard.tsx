import BulletPoint from "@/components/icons/BulletPoint";
import Image from "next/image";

interface BenefitsCardProps {
  reversed: Boolean;
  title: string;
  subtitle: string;
  bulletpoints: string[];
  imageElement: JSX.Element;
}

export default function BenefitsCard({
  reversed,
  title,
  subtitle,
  bulletpoints,
  imageElement,
}: BenefitsCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden gap-y-4 items-center">
      <div
        className={`flex flex-col px-2 gap-4 text-sm md:text-base order-first ${
          reversed ? "md:order-last" : "md:order-first"
        }`}
      >
        <h2 className="text-xl sm:text-2xl font-medium text">{title}</h2>
        <h3>{subtitle}</h3>
        <ul>
          {bulletpoints.map((item, index) => (
            <li className="flex items-start" key={index}>
              <BulletPoint />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`flex justify-center max-w-full ${
          reversed ? "md:justify-start md:pl-3" : "md:justify-end"
        } `}
      >
        {imageElement}
      </div>
    </div>
  );
}
