export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex h-12 w-12 items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2d_logo)">
            <rect width="48" height="48" rx="24" fill="url(#paint0_linear_2d_logo)" />
            <path
              d="M24 10L12 16V28L24 34L36 28V16L24 10Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 20L24 23L30 20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
             <path
              d="M24 34V23"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 14.5L21 11.5"
               stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
             <path
                d="M33 14.5L27 11.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_2d_logo"
              x1="0"
              y1="0"
              x2="48"
              y2="48"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="hsl(var(--primary))" />
              <stop offset="1" stopColor="hsl(var(--primary) / 0.7)" />
            </linearGradient>
            <clipPath id="clip0_2d_logo">
              <rect width="48" height="48" rx="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <span className="font-headline text-2xl font-bold text-foreground">
        SmartAtten
      </span>
    </div>
  );
}
