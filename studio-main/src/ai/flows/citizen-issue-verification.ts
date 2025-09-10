'use server';

/**
 * @fileOverview A flow for verifying citizen-submitted issue reports.
 *
 * - verifyCitizenIssueReport - A function that verifies the classification and information from a newly submitted issue report.
 * - VerifyCitizenIssueReportInput - The input type for the verifyCitizenIssueReport function.
 * - VerifyCitizenIssueReportOutput - The return type for the verifyCitizenIssueReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyCitizenIssueReportInputSchema = z.object({
  description: z.string().describe('The description of the issue report.'),
  photoDataUri: z
    .string()
    .describe(
      'A photo of the issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  issueType: z.string().describe('The type of issue reported.'),
  location: z.string().describe('The location of the issue.'),
});
export type VerifyCitizenIssueReportInput = z.infer<
  typeof VerifyCitizenIssueReportInputSchema
>;

const VerifyCitizenIssueReportOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the issue report is valid or not.'),
  correctedIssueType: z.string().describe('The corrected issue type if the original was incorrect.'),
  summary: z.string().describe('A summary of the issue report and its verification.'),
});
export type VerifyCitizenIssueReportOutput = z.infer<
  typeof VerifyCitizenIssueReportOutputSchema
>;

export async function verifyCitizenIssueReport(
  input: VerifyCitizenIssueReportInput
): Promise<VerifyCitizenIssueReportOutput> {
  return verifyCitizenIssueReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyCitizenIssueReportPrompt',
  input: {schema: VerifyCitizenIssueReportInputSchema},
  output: {schema: VerifyCitizenIssueReportOutputSchema},
  prompt: `You are an expert civic issue report verifier. Your job is to verify the information provided in citizen issue reports.

  Here is the issue report information:
  Description: {{{description}}}
  Photo: {{media url=photoDataUri}}
  Issue Type: {{{issueType}}}
  Location: {{{location}}}

  Determine if the issue report is valid based on the description, photo, issue type, and location.
  If the issue type is incorrect, correct it and explain why. Regardless of validity, provide a summary of the issue report and your verification process.
`,
});

const verifyCitizenIssueReportFlow = ai.defineFlow(
  {
    name: 'verifyCitizenIssueReportFlow',
    inputSchema: VerifyCitizenIssueReportInputSchema,
    outputSchema: VerifyCitizenIssueReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
