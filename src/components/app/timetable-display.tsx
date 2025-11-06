import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const generalDetails = {
  Department: 'Computer Science Engineering',
  Room: 'GF-9, NCRC',
  'Batch CSE-SS-13': 'Roll Nos. 421–455',
  'Batch CSE-SS-14': 'Roll Nos. 456–590',
  Commencement: '04-08-2025',
  'Effective from': '18-08-2025',
};

const schedule = {
    Monday: [
        { time: '9:00 AM – 9:50 AM', subject: 'C Programming Lab (Batch CSE-SS-13)', faculty: 'Prof. PSN Raju', location: 'Lab-II' },
        { time: '9:50 AM – 10:40 AM', subject: 'Computer Engineering Workshop (Batch CSE-SS-14)', faculty: 'Mr. K. Venkatesu', location: 'WS Lab-II' },
        { time: '10:40 AM – 12:20 PM', subject: 'Free / Self-Study', faculty: '', location: '' },
        { time: '12:20 PM – 1:30 PM', subject: 'Lunch Break', faculty: '', location: '' },
        { time: '1:30 PM – 4:00 PM', subject: 'Tutorial / Self-Study / Library', faculty: '', location: '' },
    ],
    Tuesday: [
        { time: '9:00 AM – 10:40 AM', subject: 'Computer Programming Using C', faculty: 'Prof. G. Sandhya Devi', location: 'Classroom' },
        { time: '10:40 AM – 12:20 PM', subject: 'IT Essentials', faculty: 'Prof. A. Gowthami Latha', location: 'Classroom' },
        { time: '12:20 PM – 1:30 PM', subject: 'Lunch Break', faculty: '', location: '' },
        { time: '1:30 PM – 4:00 PM', subject: 'Tutorial / Self-Study / Library', faculty: '', location: '' },
    ],
    Wednesday: [
        { time: '9:00 AM – 9:50 AM', subject: 'Communication Skills Lab (Batch CSE-SS-13)', faculty: 'ms nillema', location: 'Lab-II' },
        { time: '9:50 AM – 10:40 AM', subject: 'C Programming Lab (Batch CSE-SS-14)', faculty: 'Prof. PSN Raju', location: 'Lab-II' },
        { time: '10:40 AM – 12:20 PM', subject: 'Free / Self-Study', faculty: '', location: '' },
        { time: '12:20 PM – 1:30 PM', subject: 'Lunch Break', faculty: '', location: '' },
        { time: '1:30 PM – 4:00 PM', subject: 'Free / Self-Study / Library', faculty: '', location: '' },
    ],
    Thursday: [
        { time: '9:00 AM – 10:40 AM', subject: 'English', faculty: 'ms nillema', location: 'Classroom' },
        { time: '10:40 AM – 12:20 PM', subject: 'IT Essentials', faculty: 'Prof. A. Gowthami Latha', location: 'Classroom' },
        { time: '12:20 PM – 1:30 PM', subject: 'Lunch Break', faculty: '', location: '' },
        { time: '1:30 PM – 3:10 PM', subject: 'Computer Programming Using C', faculty: 'Prof. G. Sandhya Devi', location: 'Classroom' },
        { time: '3:10 PM – 4:00 PM', subject: 'Free / Self-Study', faculty: '', location: '' },
    ],
    Friday: [
        { time: '9:00 AM – 10:40 AM', subject: 'Mathematics–I', faculty: 'Mr. T. Ganesh', location: 'Classroom' },
        { time: '10:40 AM – 12:20 PM', subject: 'Green Chemistry', faculty: 'Dr. D. Chinna Rao', location: 'Classroom' },
        { time: '12:20 PM – 1:30 PM', subject: 'Lunch Break', faculty: '', location: '' },
        { time: '1:30 PM – 3:10 PM', subject: 'Computer Engg. Workshop (Batch CSE-SS-13)', faculty: 'Mr. K. Venkatesu', location: 'WS Lab-I' },
        { time: '3:10 PM – 4:00 PM', subject: 'Communication Skills Lab (Batch CSE-SS-14)', faculty: 'ms nillema', location: 'Lab-II' },
        { time: '—', subject: 'SWATCH BHARATH (Activity)', faculty: '—', location: '—' },
    ],
    Saturday: [
        { time: '9:00 AM – 10:40 AM', subject: 'Green Chemistry', faculty: 'Dr. D. Chinna Rao', location: 'Classroom' },
        { time: '10:40 AM – 12:20 PM', subject: 'Mathematics–I', faculty: 'Mr. T. Ganesh', location: 'Classroom' },
        { time: '12:20 PM – 1:30 PM', subject: 'Lunch Break', faculty: '', location: '' },
        { time: '1:30 PM – 4:00 PM', subject: 'Free / Self-Study', faculty: '', location: '' },
    ],
};

const facultySummary = [
    { name: 'Prof. PSN Raju', subject: 'C Programming Lab' },
    { name: 'Mr. K. Venkatesu', subject: 'Computer Engineering Workshop' },
    { name: 'Prof. G. Sandhya Devi', subject: 'Computer Programming Using C' },
    { name: 'Prof. A. Gowthami Latha', subject: 'IT Essentials' },
    { name: 'ms nillema', subject: 'English, Communication Skills Lab' },
    { name: 'Mr. T. Ganesh', subject: 'Mathematics–I' },
    { name: 'Dr. D. Chinna Rao', subject: 'Green Chemistry' },
];

export default function TimetableDisplay() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            General Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {Object.entries(generalDetails).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">
                  {key}
                </span>
                <span className="text-lg font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Day-wise Schedule
          </CardTitle>
          <CardDescription>
            The weekly class schedule for all batches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(schedule).map(([day, classes]) => (
              <div key={day}>
                <h3 className="mb-2 font-headline text-xl font-semibold text-primary">
                  {day}
                </h3>
                <div className="overflow-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Time</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Faculty</TableHead>
                        <TableHead>Location</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classes.map((c, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{c.time}</TableCell>
                          <TableCell>{c.subject}</TableCell>
                          <TableCell>{c.faculty || '—'}</TableCell>
                          <TableCell>{c.location || '—'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Faculty Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty Name</TableHead>
                  <TableHead>Subject</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultySummary.map((faculty, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{faculty.name}</TableCell>
                    <TableCell>{faculty.subject}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
