export interface FeatureCardProps {
  title: string;
  text: string;
  icon: JSX.Element;
}

export default function FeatureCard({ title, text, icon }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-4 p-6 border-4">
      <h2 className="flex items-center gap-2 text-sm md:text-base font-bold">
        {icon} {title}
      </h2>
      <p className="text-sm sm:text-md">{text}</p>
    </div>
  );
}
