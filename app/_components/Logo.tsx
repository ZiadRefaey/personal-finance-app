import LogoLarge from "@/public/logo-large.svg";
// import LogoSmall from "@/public/logo-small.svg";
import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src={LogoLarge}
      className="w-[121px] h-[22px]"
      alt="Personal Finance App's Logo"
    />
  );
}
