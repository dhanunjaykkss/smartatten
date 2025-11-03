'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getSummaryAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Summary
        </>
      )}
    </Button>
  );
}

const initialState = {
  summary: '',
  message: '',
};

export default function SummaryTool() {
  const [state, formAction] = useFormState(getSummaryAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Instructions</CardTitle>
          <CardDescription>
            Enter your request below. For example: "Show me all students who were absent for more than 2 days last week."
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Textarea
              name="instructions"
              placeholder="e.g., Which students in AP Chemistry had perfect attendance this week?"
              rows={4}
              required
              className="text-base"
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {(state?.summary) && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generated Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap rounded-md bg-muted/50 p-4">
                {state.summary}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
