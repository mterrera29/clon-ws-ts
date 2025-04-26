import { useState } from 'react';

export default function useAIResponse() {
  const [AiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchData = async (caracter: string, message: string) => {
    setLoading(true);
    setAiResponse('');

    const maxRetries = 3;
    let attempts = 0;
    let success = false;

    while (attempts < maxRetries && !success) {
      try {
        const response = await fetch(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemma-3-27b-it:free',
              messages: [
                {
                  role: 'user',
                  content: [
                    {
                      type: 'text',
                      text: `"Eres "${caracter}. Actúa como una deidad griega en un chat informal. Reglas estrictas:
                    1. **Formato**: Solo responde el texto en primera persona (nada de "Zeus:", notas o paréntesis).
                    2. **Longitud**: 2-3 oraciones máximo.
                    3. **Tono**: Natural pero con autoridad divina. Evita lo teatral.
                    4. **Contenido**: Basado en mitos reales, pero sin citar fuentes.
                    5. **Emojis**: Máximo 1 por respuesta (solo ⚡️🌪️🏛️🦉 si son relevantes).
                    6. **Personalidad**: Adecúa respuestas al dios seleccionado (ej: Hades es seco, Afrodita coqueta).
                    Ejemplos válidos:
                    - Tu audacia me divierte, mortal. Pero cuidado, mi rayo no perdona.
                    - El Olimpo tiembla con tu pregunta. Formula mejor tu petición.
                    Pregunta del alumno: "${message}"`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (!response.ok) throw new Error('Respuesta inválida');
        const data = await response.json();

        const content = data.choices?.[0]?.message?.content;

        if (content) {
          const promptTokens = data.usage?.prompt_tokens;
          const completionTokens = data.usage?.completion_tokens;
          const totalTokens = data.usage?.total_tokens;

          console.log(`Tokens usados: 
          Prompt → ${promptTokens} 
          Respuesta → ${completionTokens} 
          Total → ${totalTokens}`);

          setAiResponse(content);
          success = true;
        } else {
          throw new Error('Respuesta vacía o indefinida');
        }
      } catch (error) {
        attempts++;
        console.error(`Error en el intento ${attempts}:`, error);
        if (attempts >= maxRetries) {
          setAiResponse(
            'Hubo un problema con la respuesta. Intentalo más tarde.'
          );
        }
      } finally {
        if (success || attempts >= maxRetries) {
          setLoading(false);
        }
      }
    }
  };

  return { AiResponse, loading, fetchData };
}
