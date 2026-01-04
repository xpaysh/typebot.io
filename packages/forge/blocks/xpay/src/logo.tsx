import type { SVGProps } from "react";

export const XPayLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="none"
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#10b981" />
    <path
      d="M25 35L45 55L25 75"
      stroke="white"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M55 35L75 55L55 75"
      stroke="white"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="55" r="6" fill="white" />
  </svg>
);
