import LogoLarge from "@/public/logo-large.svg";
import LogoSmall from "@/public/logo-small.svg";
import Image from "next/image";

export default function Logo({ isLogoLarge = true }) {
  if (!isLogoLarge) {
    return (
      <Image
        src={LogoSmall}
        className="w-[12.48] h-[21.44px]"
        alt="Personal Finance App's Logo"
      />
    );
  }
  return (
    <Image
      src={LogoLarge}
      className="w-[121px] h-[22px]"
      alt="Personal Finance App's Logo"
    />
  );
}
