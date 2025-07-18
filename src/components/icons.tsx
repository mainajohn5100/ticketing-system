import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      version="1"
      viewBox="0 0 32 32"
      {...props}
    >
      <rect
        fill="#4f4f4f"
        width="28"
        height="28"
        x="-30"
        y="-30"
        rx="1.4"
        ry="1.4"
        transform="matrix(0,-1,-1,0,0,0)"
      />
      <path
        fill="#848484"
        d="m8 9v16h16v-16h-16zm3 3h10v10h-10v-10z"
      />
      <rect opacity=".2" width="10" height="10" x="6" y="18" />
      <rect fill="#64b5ff" width="10" height="10" x="6" y="17" />
      <rect opacity=".2" width="10" height="7" x="6" y="8" />
      <rect fill="#e47cff" width="10" height="7" x="6" y="7" />
      <circle opacity=".2" cx="22.5" cy="11.5" r="3.5" />
      <circle fill="#ff6363" cx="22.5" cy="10.5" r="3.5" />
      <rect opacity=".2" width="8" height="7" x="18" y="20" />
      <rect fill="#3bff80" width="8" height="7" x="18" y="19" />
      <path
        fill="#fff"
        opacity=".1"
        d="m3.4004 2c-0.7756 0-1.4004 0.6248-1.4004 1.4004v1c0-0.7756 0.6248-1.4004 1.4004-1.4004h25.2c0.775 0 1.4 0.6248 1.4 1.4004v-1c0-0.7756-0.625-1.4004-1.4-1.4004h-25.2z"
      />
      <path
        opacity=".2"
        d="m2 28.6v1c0 0.775 0.6248 1.4 1.4004 1.4h25.2c0.775 0 1.4-0.625 1.4-1.4v-1c0 0.775-0.625 1.4-1.4 1.4h-25.2c-0.7752 0-1.4-0.625-1.4-1.4z"
      />
    </svg>
  );
}
