import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhanceAnnouncement = async (text: string, type: string, langCode: string = 'pt-BR'): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a corporate communication assistant.
      Enhance the following text for a shared calendar/notice board.
      Message Type: ${type}.
      Target Language: ${langCode} (Translate/Adapt if necessary).
      
      Original Text: "${text}"

      Requirements:
      - Keep it professional but friendly.
      - Fix grammar errors.
      - Be concise (max 3 sentences).
      - Output ONLY the enhanced text in ${langCode}, no quotes or extra explanations.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return text; // Return original text on error
  }
};

export const suggestEvents = async (dateContext: string, langCode: string = 'pt-BR'): Promise<{ title: string; description: string }[]> => {
  try {
      const prompt = `
        Generate 3 fictitious corporate events for the month of ${dateContext}.
        Language: ${langCode}.
        Be creative and concise.
      `;
      
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ['title', 'description']
                }
              }
          }
      });
      
      const text = response.text;
      if (!text) return [];
      return JSON.parse(text);
  } catch (e) {
      console.error(e);
      return [];
  }
}

export const translateContent = async (text: string, targetLangCode: string): Promise<string> => {
  try {
    const prompt = `
      Translate the following text to the language associated with the code "${targetLangCode}".
      Output ONLY the translated text, nothing else.
      
      Text: "${text}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};