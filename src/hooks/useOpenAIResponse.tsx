import { useState } from 'react';
import OpenAI from 'openai';

export default function useOpenAIResponse() {
  const [AiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OPEN_API_KEY;

  const fetchData = async (caracter: string, message: string) => {
    setLoading(true);
    setAiResponse('');

    const openai = new OpenAI({
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const completion = openai.chat.completions.create({
      model: 'gpt-4o-mini',
      store: true,
      messages: [
        {
          role: 'user',
          content: `Quiero que asumas el rol de ${caracter}, una figura histórica. Respondé a este mensaje como si fueras ${caracter}, usando un tono cercano y coloquial, en primera persona, con dos oraciones cortas, como si fuera un mensaje de WhatsApp. Basate en datos históricos relevantes y responde lo siguiente: ${message}`,
        },
      ],
    });

    completion.then((result) => setAiResponse(result.choices[0].message));
    setLoading(false);
  };

  return { AiResponse, loading, fetchData };
}
