import CaretRight from "@/public/icon-caret-right.svg";
import Image from "next/image";
import Link from "next/link";
type SectionHeaderType = {
  title: string;
  href: string;
  buttonContent: "See Details" | "View All";
};
export default function OverviewSectionHeader({
  title,
  href,
  buttonContent,
}: SectionHeaderType) {
  return (
    <div className="flex items-center justify-between w-full mb-5">
      <p className="text-preset-2 text-primary">{title}</p>
      <Link
        className="text-preset-4 text-secondary hover:text-primary transition-all duration-100"
        href={href}
      >
        {buttonContent}
        <span className="ml-3 inline-flex ">
          <Image src={CaretRight} alt="Caret right icon" />
        </span>
      </Link>
    </div>
  );
}
