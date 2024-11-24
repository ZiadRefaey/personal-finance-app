import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSetParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  return function setParams(option: string, value: string) {
    params.set(option, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
}
