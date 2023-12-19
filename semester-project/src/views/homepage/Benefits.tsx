import BenefitsCard from "./BenefitsCard";

export default function Benefits() {
  return (
    <div className="flex flex-col gap-16">
      <BenefitsCard reversed={false} />
      <BenefitsCard reversed={true} />
      <BenefitsCard reversed={false} />
    </div>
  );
}
