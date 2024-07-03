interface Props {
  sectionName: string;
}

export default function BookPageSectionTitle({ sectionName }: Props) {
  return (
    <div>
      <h3 className="uppercase text-sm lg:text-base text-gray-400 mb-2">
        {sectionName}
      </h3>
      <hr />
    </div>
  );
}
