
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FileDown, Loader2 } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';

export default function ExportAttendanceDialog({ classes, children, asTrigger = false }: { classes: string[], children?: React.ReactNode, asTrigger?: boolean }) {
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (!selectedClass) {
      setError('Please select a class to export.');
      return;
    }
    setError(null);
    setIsDownloading(true);

    const today = format(new Date(), 'yyyy-MM-dd');
    const url = `/api/attendance/export?className=${encodeURIComponent(selectedClass)}&date=${today}`;

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
      setSelectedClass('');
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
                <Button variant="outline" disabled={classes.length === 0}>
                    <FileDown className="mr-2" />
                    Export Data
                </Button>
            )}
        </Trigger>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Today's Attendance</DialogTitle>
          <DialogDescription>
            Select a class to download the attendance sheet as a CSV file for {format(new Date(), 'PPP')}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="class-select" className="text-right">
              Class
            </Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger id="class-select" className="col-span-3">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((c) => (
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
          <Button onClick={handleExport} disabled={isDownloading || !selectedClass}>
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
