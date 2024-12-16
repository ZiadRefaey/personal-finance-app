import { ReactNode } from "react";
import Button from "../_components/UI/Button";
import Logo from "../_components/Logo";
import {
  SignInWithGithub,
  SignInWithGoogle,
  SignInWithSpotify,
} from "../_lib/actions";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSpotify } from "react-icons/fa";
export const metadata = {
  title: "Login",
  description:
    "Login page where you can login with a google, spotify or github account.",
};
export default function page() {
  return (
    <div className="w-full h-full grid grid-rows-[70px,1fr] xl:grid-rows-1 xl:grid-cols-[540px,1fr] gap-5 ">
      <div className="w-full bg-navbar h-full rounded-lg flex items-center justify-center xl:bg-login-illustration xl:flex-col xl:items-start xl:justify-between xl:p-10">
        <Logo />
        <div className="hidden xl:block text-white bg-navbar p-5 rounded-lg ">
          <h2 className=" text-preset-1 mb-6">
            Keep track of your money and save your future
          </h2>
          <p className="text-preset-4 ">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-card-back-ground py-6 px-5 md:p-8 flex flex-col items-start justify-center w-full max-w-[560px] rounded-xl">
          <h1 className="text-primary text-preset-1 mb-8">Login</h1>
          <div className="w-full flex flex-col items-center justify-center gap-4 ">
            <ProviderSignInButton
              providerName={"Google"}
              providerFunc={SignInWithGoogle}
              providerIcon={<FcGoogle className="size-5" />}
            />
            <ProviderSignInButton
              providerName={"Spotify"}
              providerFunc={SignInWithSpotify}
              providerIcon={<FaSpotify className="size-5" />}
            />
            <ProviderSignInButton
              providerName={"Github"}
              providerFunc={SignInWithGithub}
              providerIcon={<FaGithub className="size-5" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
function ProviderSignInButton({
  providerName,
  providerFunc,
  providerIcon,
}: {
  providerName: string;
  providerFunc: () => void;
  providerIcon: ReactNode;
}) {
  return (
    <form className="w-full" action={providerFunc}>
      <Button
        type="submit"
        className="w-full flex items-center justify-center gap-4"
      >
        Sign In With {providerName}{" "}
        <span className="inline-flex ">{providerIcon}</span>
      </Button>
    </form>
  );
}
