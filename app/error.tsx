"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-primary">
      <h2 className="text-primary text-preset-1 mb-10">
        Something went wrong!
      </h2>
      <p className="text-secondary text-preset-3 mb-2"> {error.message}</p>
      <p className="text-secondary text-preset-3 mb-2">
        if the issue persists please contact the developer
      </p>
      <Link
        className="rounded-lg p-4 transition-all duration-150  bg-primary text-background hover:bg-secondary text-preset-4"
        href={"/"}
      >
        Home Page
      </Link>
    </div>
  );
}
