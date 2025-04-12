import { useState } from 'react';

export default function useAIResponse() {
  const [AiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchData = async (caracter: string, message: string) => {
    console.log(message);
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
              model: 'google/gemma-3-4b-it:free',
              messages: [
                {
                  role: 'user',
                  content: [
                    {
                      type: 'text',
                      text: `"Vos sos ${caracter}. Estás usando WhatsApp en el siglo XXI. Respondé mensajes como si fueras vos. Mantené tu personalidad seria, tus ideas y tu historia. respuiestas cortas no mas de dos oraciones, con datos historicos reales, podes buscar aca https://es.wikipedia.org/wiki/Manuel_Belgrano, responde sobre lo que te pregunto"
                  
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
