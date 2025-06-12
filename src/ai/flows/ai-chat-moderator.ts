// This is a server-side file.
'use server';

/**
 * @fileOverview implements a Genkit flow for AI chat moderation, where the AI announces when it's performing a moderation task.
 *
 * - aiChatModerator - A function that moderates user messages and announces moderation actions.
 * - AiChatModeratorInput - The input type for the aiChatModerator function.
 * - AiChatModeratorOutput - The return type for the aiChatModerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiChatModeratorInputSchema = z.object({
  userMessage: z.string().describe('The message sent by the user.'),
});
export type AiChatModeratorInput = z.infer<typeof AiChatModeratorInputSchema>;

const AiChatModeratorOutputSchema = z.object({
  moderatedMessage: z.string().describe('The potentially moderated message.'),
  moderationAnnouncement: z.string().describe('The announcement made by the AI when moderating.'),
});
export type AiChatModeratorOutput = z.infer<typeof AiChatModeratorOutputSchema>;

export async function aiChatModerator(input: AiChatModeratorInput): Promise<AiChatModeratorOutput> {
  return aiChatModeratorFlow(input);
}

const aiChatModeratorPrompt = ai.definePrompt({
  name: 'aiChatModeratorPrompt',
  input: {schema: AiChatModeratorInputSchema},
  output: {schema: AiChatModeratorOutputSchema},
  prompt: `You are a moderator in a chat application. Your task is to review user messages and ensure they comply with community guidelines.

  If a message violates the guidelines, you should:
  1.  Rewrite the message to be appropriate.
  2.  Clearly announce to the other user that you have rewritten the message and why. For example: "I have rewritten your message because it contained offensive language. The revised message is:".
  3. Return both moderatedMessage and moderationAnnouncement

  If the message is appropriate, return the original message in the moderatedMessage field and an empty string in the moderationAnnouncement field.

  User Message: {{{userMessage}}}
  `,
});

const aiChatModeratorFlow = ai.defineFlow(
  {
    name: 'aiChatModeratorFlow',
    inputSchema: AiChatModeratorInputSchema,
    outputSchema: AiChatModeratorOutputSchema,
  },
  async input => {
    const {output} = await aiChatModeratorPrompt(input);
    return output!;
  }
);
