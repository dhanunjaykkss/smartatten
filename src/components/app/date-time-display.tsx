'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(timer); // Cleanup the interval on component unmount
    };
  }, []);

  return (
    <div className="text-sm text-muted-foreground">
      <span>{format(currentDateTime, 'eeee, MMMM do, yyyy')}</span>
      <span className="mx-2">|</span>
      <span>{format(currentDateTime, 'h:mm:ss a')}</span>
    </div>
  );
}
