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
            fill="hsl(var(--primary))"
          />
          <rect
            x="89"
            y="37"
            width="5"
            height="20"
            rx="2.5"
            fill="hsl(var(--foreground))"
          />
        </svg>
      </div>
      <span className="font-headline text-2xl font-bold text-foreground">
        SmartAtten
      </span>
    </div>
  );
}
