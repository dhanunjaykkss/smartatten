import SummaryTool from '@/components/app/summary-tool';

export default function SummaryPage() {
  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
          Attendance Summary Tool
        </h1>
        <p className="mt-2 text-muted-foreground">
          Use AI to analyze and summarize attendance data. Provide instructions below.
        </p>
      </div>

      <SummaryTool />
    </div>
  );
}
