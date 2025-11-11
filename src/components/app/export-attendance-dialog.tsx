
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { FileDown, Loader2 } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type ExportType = 'month' | 'day';

export default function ExportAttendanceDialog({ classes, children, asTrigger = false }: { classes: string[], children?: React.ReactNode, asTrigger?: boolean }) {
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), 'yyyy-MM'));
  const [selectedDay, setSelectedDay] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [exportType, setExportType] = useState<ExportType>('month');
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    let url = `/api/attendance/export?`;
    let hasParams = false;

    if (exportType === 'month') {
        if (!selectedMonth) {
            setError('Please select a month.');
            return;
        }
        url += `month=${encodeURIComponent(selectedMonth)}`;
        hasParams = true;
    } else { // 'day'
        if (!selectedDay) {
            setError('Please select a day.');
            return;
        }
        url += `date=${encodeURIComponent(selectedDay)}`;
        hasParams = true;
    }
    
    if (selectedSubject !== 'all') {
        url += `&subject=${encodeURIComponent(selectedSubject)}`;
    }

    if (!hasParams) {
        setError('Please select criteria for export.');
        return;
    }

    setError(null);
    setIsDownloading(true);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to download file.');
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        const disposition = response.headers.get('content-disposition');
        let filename = 'attendance.csv';
        if (disposition && disposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }

        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
        setOpen(false);

    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsDownloading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset state on close
      setSelectedMonth(format(new Date(), 'yyyy-MM'));
      setSelectedDay(format(new Date(), 'yyyy-MM-dd'));
      setSelectedSubject('all');
      setExportType('month');
      setError(null);
      setIsDownloading(false);
    }
  }

  const Trigger = asTrigger ? Slot : 'div';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Trigger>
            {children ? children : (
                <Button variant="outline">
                    <FileDown className="mr-2" />
                    Export Data
                </Button>
            )}
        </Trigger>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Attendance Data</DialogTitle>
          <DialogDescription>
            Download attendance records for a specific day or an entire month.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
            <RadioGroup defaultValue="month" onValueChange={(value: ExportType) => setExportType(value)}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="month" id="r-month" />
                    <Label htmlFor="r-month">Export by Month</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="day" id="r-day" />
                    <Label htmlFor="r-day">Export by Day</Label>
                </div>
            </RadioGroup>

            {exportType === 'month' && (
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="month-select" className="text-right">
                    Month
                    </Label>
                    <Input
                    id="month-select"
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="col-span-3"
                    />
                </div>
            )}

            {exportType === 'day' && (
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="day-select" className="text-right">
                    Day
                    </Label>
                    <Input
                    id="day-select"
                    type="date"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="col-span-3"
                    />
                </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject-select" className="text-right">
                    Subject
                </Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {classes.map(c => (
                            <SelectItem key={c} value={c}>
                            {c}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            {error && <p className="text-sm text-destructive text-center col-span-4">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleExport} disabled={isDownloading}>
            {isDownloading ? (
                <>
                    <Loader2 className="mr-2 animate-spin" />
                    Exporting...
                </>
            ) : (
                'Export to CSV'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
