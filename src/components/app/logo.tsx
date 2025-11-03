import { BookHeart } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
        <BookHeart className="h-8 w-8 text-primary-foreground" />
      </div>
      <span className="font-headline text-2xl font-bold text-foreground">
        SmartAtten
      </span>
    </div>
  );
}
