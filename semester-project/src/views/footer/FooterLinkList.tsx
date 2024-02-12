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
    <div className="flex flex-col gap-5 p-6">
      <h1 className="text-sm sm:text-base font-bold">{title}</h1>
      <ul>
        {links.map((link, index: number) => (
          <li key={index} className="text-xs sm:text-sm">
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
