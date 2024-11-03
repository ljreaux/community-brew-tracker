import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Grouped<T> = { [key: string]: T[] };

export function groupBy<T>(
  array: T[],
  getKey: (item: T) => string
): Grouped<T> {
  return array.reduce((acc, item) => {
    const key = getKey(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Grouped<T>);
}
