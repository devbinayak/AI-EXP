// src/ai/flows/ai-chat-participant.ts
'use server';

/**
 * @fileOverview An AI chat participant flow that allows users to add an AI to a chat.
 *
 * - aiChatParticipant - A function that handles the AI chat participation process.
 * - AiChatParticipantInput - The input type for the aiChatParticipant function.
 * - AiChatParticipantOutput - The return type for the aiChatParticipant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiChatParticipantInputSchema = z.object({
  chatHistory: z.string().describe('The current chat history.'),
  userInput: z.string().describe('The user input to the AI.'),
});
export type AiChatParticipantInput = z.infer<typeof AiChatParticipantInputSchema>;

const AiChatParticipantOutputSchema = z.object({
  aiResponse: z.string().describe('The AI response to the user input.'),
});
export type AiChatParticipantOutput = z.infer<typeof AiChatParticipantOutputSchema>;

export async function aiChatParticipant(input: AiChatParticipantInput): Promise<AiChatParticipantOutput> {
  return aiChatParticipantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatParticipantPrompt',
  input: {schema: AiChatParticipantInputSchema},
  output: {schema: AiChatParticipantOutputSchema},
  prompt: `You are an AI participating in a chat with other users.  You will respond to the user input based on the chat history.

Chat History:
{{chatHistory}}

User Input:
{{userInput}}`,
});

const aiChatParticipantFlow = ai.defineFlow(
  {
    name: 'aiChatParticipantFlow',
    inputSchema: AiChatParticipantInputSchema,
    outputSchema: AiChatParticipantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
