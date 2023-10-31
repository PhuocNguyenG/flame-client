import * as React from "react";

const CrossIcon = ({
  size = 25,
  strokeWidth = 2.5,
  color = "currentColor",
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m6 6 12 12M6 18 18 6 6 18Z" />
  </svg>
);

export default CrossIcon;
