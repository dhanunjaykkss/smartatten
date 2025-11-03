'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDateTime(new Date());
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(timer); // Cleanup the interval on component unmount
    };
  }, []);

  if (!currentDateTime) {
    return <div className="h-5 w-64 animate-pulse rounded-md bg-muted" />;
  }

  return (
    <div className="text-sm text-muted-foreground">
      <span>{format(currentDateTime, 'eeee, MMMM do, yyyy')}</span>
      <span className="mx-2">|</span>
      <span>{format(currentDateTime, 'h:mm:ss a')}</span>
    </div>
  );
}
