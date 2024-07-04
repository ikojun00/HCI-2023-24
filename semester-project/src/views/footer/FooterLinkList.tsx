import Link from "next/link";

type Item = {
  href: string;
  label: string;
};

type Props = {
  title: string;
  links: Array<Item>;
};

export default function FooterLinkList({ title, links }: Props) {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h1 className="text-sm sm:text-base font-bold">{title}</h1>
      <ul className="flex flex-col gap-3">
        {links.map((link, index: number) => (
          <li key={index} className="text-xs sm:text-sm">
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
