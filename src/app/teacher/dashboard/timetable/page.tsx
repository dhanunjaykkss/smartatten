import TimetableDisplay from '@/components/app/timetable-display';

export default function TimetablePage() {
  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
          Class Timetable
        </h1>
        <p className="mt-2 text-muted-foreground">
          Detailed schedule for the Computer Science Engineering department.
        </p>
      </div>

      <TimetableDisplay />
    </div>
  );
}
