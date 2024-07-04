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
    <div className="flex flex-col gap-12 sm:gap-20 sm:flex-row md:justify-between items-center">
      <div
        className={`w-full sm:w-3/5 flex flex-col gap-6 text-sm md:text-base order-first ${
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
      <div className="w-4/5 sm:w-2/5">{imageElement}</div>
    </div>
  );
}
