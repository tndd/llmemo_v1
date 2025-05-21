import clsx from "clsx";

export const containerClasses = clsx(
  "flex flex-col",
  "flex-grow",
  "h-full",
  "bg-white",
);
export const headerClasses = clsx(
  "flex items-center",
  "justify-between",
  "h-16",
  "px-6",
  "border-b border-gray-200",
  "bg-white",
);
export const titleClasses = clsx(
  "text-xl",
  "font-semibold",
);
export const contentClasses = clsx("p-6");
