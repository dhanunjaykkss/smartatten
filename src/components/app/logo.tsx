export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex h-12 w-12 items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 55L4 35.6842L50 15L96 35.6842L50 55Z"
            fill="hsl(var(--foreground))"
          />
          <path
            d="M86.1053 85C86.1053 85 89.2632 67.2632 89.2632 55.0526C89.2632 42.8421 86.1053 37.7895 86.1053 37.7895L50 53.0526L13.8947 37.7895C13.8947 37.7895 10.7368 42.8421 10.7368 55.0526C10.7368 67.2632 13.8947 85 13.8947 85H86.1053Z"
            fill="hsl(var(--foreground))"
          />
          <rect
            x="89"
            y="37"
            width="5"
            height="20"
            rx="2.5"
            fill="hsl(var(--foreground))"
          />
          <circle cx="50" cy="20" r="10" fill="hsl(var(--primary))" />
          <path
            d="M50 30C55.5228 30 60 25.5228 60 20H40C40 25.5228 44.4772 30 50 30Z"
            fill="hsl(var(--primary))"
          />
          <circle cx="30" cy="30" r="7" fill="hsl(var(--primary))" />
          <path
            d="M30 37C33.866 37 37 33.866 37 30H23C23 33.866 26.134 37 30 37Z"
            fill="hsl(var(--primary))"
          />
          <circle cx="70" cy="30" r="7" fill="hsl(var(--primary))" />
          <path
            d="M70 37C73.866 37 77 33.866 77 30H63C63 33.866 66.134 37 70 37Z"
            fill="hsl(var(--primary))"
          />
        </svg>
      </div>
      <span className="font-headline text-2xl font-bold text-foreground">
        SmartAtten
      </span>
    </div>
  );
}
