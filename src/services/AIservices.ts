import { streamText } from 'ai';
import { openRouter } from '../lib/ai';
import { Caracter } from '../types';
export default {
  async generateRecipe(prompt: string, caracter: Caracter) {
    const god = caracter.caracter;
    const result = streamText({
      model: openRouter('meta-llama/llama-4-maverick:free'),
      prompt,
      system:
        `Debes responder como si fueras el dios griego ${god}` +
        'Tus respuestas se deben acotar a dos parrafos no muy largos' +
        'responder en primera persona' +
        'podes usar emoticones seris como simbolos, no caritas' +
        'si no te lo preguntan no digas quien sos',
      temperature: 1,
    });
    await result.consumeStream();
    return result.text;
  },
};
