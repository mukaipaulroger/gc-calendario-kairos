import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhanceAnnouncement = async (text: string, type: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Você é um assistente de comunicação corporativa.
      Melhore o seguinte texto para um quadro de avisos ou calendário compartilhado.
      O tipo da mensagem é: ${type}.
      
      Texto original: "${text}"

      Requisitos:
      - Mantenha o tom profissional mas amigável.
      - Corrija erros gramaticais.
      - Seja conciso (máximo de 3 frases).
      - Retorne APENAS o texto melhorado, sem aspas ou explicações adicionais.
      - O idioma deve ser Português do Brasil.
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

export const suggestEvents = async (dateContext: string): Promise<{ title: string; description: string }[]> => {
  try {
      const prompt = `
        Gere 3 sugestões de eventos corporativos fictícios curtos e criativos para o mês de ${dateContext}.
        Retorne estritamente um JSON array.
        Exemplo: [{"title": "Café da Manhã", "description": "Reunião mensal de alinhamento."}]
      `;
      
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
              responseMimeType: 'application/json'
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