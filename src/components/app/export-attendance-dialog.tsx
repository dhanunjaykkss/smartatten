
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

export default function ExportAttendanceDialog({ classes, children, asTrigger = false }: { classes: string[], children?: React.ReactNode, asTrigger?: boolean }) {
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), 'yyyy-MM'));
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (!selectedMonth) {
      setError('Please select a month to export.');
      return;
    }
    setError(null);
    setIsDownloading(true);

    const url = `/api/attendance/export?month=${encodeURIComponent(selectedMonth)}`;

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
      setSelectedMonth(format(new Date(), 'yyyy-MM'));
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Monthly Attendance</DialogTitle>
          <DialogDescription>
            Select a month and year to download a full attendance sheet for all your classes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
          {error && <p className="text-sm text-destructive text-center col-span-4">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleExport} disabled={isDownloading || !selectedMonth}>
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
