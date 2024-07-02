import BulletPoint from "@/components/icons/BulletPoint";

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
    <div className="flex flex-col gap-20 sm:flex-row md:justify-between sm:items-center items-start">
      <div
        className={`flex flex-col gap-6 text-sm md:text-base order-first ${
          reversed ? "sm:order-last" : "sm:order-first"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-medium">{title}</h2>
        <h3 className="text-base md:text-lg">{subtitle}</h3>
        <ul>
          {bulletpoints.map((item, index) => (
            <li className="flex items-start" key={index}>
              <BulletPoint />
              <p className="text-sm md:text-base">{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/5">{imageElement}</div>
    </div>
  );
}
