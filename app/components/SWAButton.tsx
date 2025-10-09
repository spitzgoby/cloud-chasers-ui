import React from "react";

export default function SWButton({
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={[
        "inline-flex items-center justify-center",
        "rounded-sw bg-sw-blue px-5 py-2 text-sm font-semibold text-black shadow-sw",
        "hover:bg-[#27409A] active:scale-[0.99] transition-color duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sw-yellow",
        className,
      ].join(" ")}
    />
  );
}
