import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { UrlQueryParams } from "@/types"
import qs from "query-string";

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
