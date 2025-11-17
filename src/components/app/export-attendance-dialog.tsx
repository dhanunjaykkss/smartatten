
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { Info } from 'lucide-react';


export default function ExportAttendanceDialog({ classes, children, asTrigger = false }: { classes: string[], children?: React.ReactNode, asTrigger?: boolean }) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExport = async () => {
    let url = `/api/attendance/export?`;
    
    if (!startDate || !endDate) {
        setError('Please select a start and end date.');
        return;
    }

    if (new Date(startDate) > new Date(endDate)) {
        setError('Start date cannot be after end date.');
        return;
    }

    url += `startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;

    if (selectedSubject !== 'all') {
        url += `&subject=${encodeURIComponent(selectedSubject)}`;
    }

    setError(null);
    setIsDownloading(true);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to download file.');
        }

        const noDataMessage = response.headers.get('X-No-Data-Message');
        if (noDataMessage) {
            toast({
                title: 'No Data Found',
                description: noDataMessage,
                duration: 5000,
            })
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
      setStartDate(format(new Date(), 'yyyy-MM-dd'));
      setEndDate(format(new Date(), 'yyyy-MM-dd'));
      setSelectedSubject('all');
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
            Download records for a date range. To export for a single day, set the "From" and "To" dates to be the same.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-date-select" className="text-right">
                From
                </Label>
                <Input
                id="start-date-select"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="col-span-3"
                />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end-date-select" className="text-right">
                To
                </Label>
                <Input
                id="end-date-select"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="col-span-3"
                />
            </div>

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
