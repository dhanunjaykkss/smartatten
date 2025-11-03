'use server';
/**
 * @fileOverview Summarizes attendance data based on user instructions.
 *
 * - summarizeAttendanceData - A function that summarizes attendance data based on user instructions.
 * - SummarizeAttendanceDataInput - The input type for the summarizeAttendanceData function.
 * - SummarizeAttendanceDataOutput - The return type for the summarizeAttendanceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAttendanceDataInputSchema = z.object({
  instructions: z
    .string()
    .describe(
      'Instructions for summarizing the attendance data, including date ranges, classes, and students.'
    ),
  attendanceData: z.string().describe('The attendance data to summarize.'),
});
export type SummarizeAttendanceDataInput = z.infer<
  typeof SummarizeAttendanceDataInputSchema
>;

const SummarizeAttendanceDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the attendance data.'),
});
export type SummarizeAttendanceDataOutput = z.infer<
  typeof SummarizeAttendanceDataOutputSchema
>;

export async function summarizeAttendanceData(
  input: SummarizeAttendanceDataInput
): Promise<SummarizeAttendanceDataOutput> {
  return summarizeAttendanceDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAttendanceDataPrompt',
  input: {schema: SummarizeAttendanceDataInputSchema},
  output: {schema: SummarizeAttendanceDataOutputSchema},
  prompt: `You are an AI assistant helping teachers analyze attendance data.\n\n  Summarize the following attendance data according to the instructions provided.\n\n  Instructions: {{{instructions}}}\n  Attendance Data: {{{attendanceData}}}\n\n  Summary:`,
});

const summarizeAttendanceDataFlow = ai.defineFlow(
  {
    name: 'summarizeAttendanceDataFlow',
    inputSchema: SummarizeAttendanceDataInputSchema,
    outputSchema: SummarizeAttendanceDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
