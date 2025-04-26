import { streamText } from 'ai';
import { openRouter } from '../lib/ai';
export default {
  async generateRecipe(prompt: string, caracter: string) {
    const result = streamText({
      model: openRouter('meta-llama/llama-4-maverick:free'),
      prompt,
      system:
        `Debes responder como si fueras el dios griego ${caracter}` +
        'Tus respuestas se deben acotar a dos parrafos no muy largos' +
        'responder en primera persona' +
        'podes usar emoticones seris como simbolos, no caritas',
      temperature: 1,
    });
    await result.consumeStream();
    return result.text;
  },
};
