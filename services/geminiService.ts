
import { GoogleGenAI, Type } from "@google/genai";

// ------------------------------------------------------------------
// CONFIGURAÇÃO DA API KEY (Compatível com Preview e Vite Local)
// ------------------------------------------------------------------
const getApiKey = (): string => {
  // 1. Tenta pegar do ambiente padrão (Preview / Node)
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    return process.env.API_KEY;
  }

  // 2. Tenta pegar do ambiente Vite (Local)
  try {
    // @ts-ignore - Evita erros de linter se import.meta não for reconhecido no editor atual
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
       // @ts-ignore
       return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Ignora erro
  }

  return "";
};

const apiKey = getApiKey();

// Log de verificação (Para depuração - Abra o F12 no navegador)
if (!apiKey) {
  console.warn("⚠️ AVISO: API KEY não encontrada!");
} else {
  // Mostra apenas os 4 primeiros caracteres por segurança
  console.log(`✅ API KEY carregada com sucesso (${apiKey.substring(0, 4)}...). IA Pronta.`);
}

const ai = new GoogleGenAI({ apiKey: apiKey });

// Helper to remove Markdown code blocks (```json ... ```) from the response
const cleanJson = (text: string): string => {
  if (!text) return "";
  return text.replace(/^```json\s*/, '').replace(/```$/, '').trim();
};

// --- NOVA FUNÇÃO: VERIFICAR STATUS DA API ---
export const checkApiConnection = async (): Promise<boolean> => {
  if (!apiKey) return false;
  try {
    // Faz uma chamada ultra-rápida para testar se a chave é válida
    await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'ping',
    });
    return true;
  } catch (error) {
    console.error("Erro na verificação da API:", error);
    return false;
  }
};

export const enhanceAnnouncement = async (text: string, type: string, langCode: string = 'pt-BR'): Promise<string> => {
  if (!apiKey) return text; // Fallback imediato se não tiver chave

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
  if (!apiKey) return [];

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
      
      try {
        return JSON.parse(cleanJson(text));
      } catch (parseError) {
        console.error("JSON Parse Error in suggestEvents:", parseError);
        return [];
      }
  } catch (e) {
      console.error(e);
      return [];
  }
}

export const translateContent = async (text: string, targetLangCode: string): Promise<string> => {
  if (!apiKey || !text) return text;

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

export const getDailyVerse = async (langCode: string): Promise<{ text: string; reference: string; version: string }> => {
  if (!apiKey) {
    // Fallback manual sem IA
    return { 
        text: "Sem conexão com IA. Configure a API Key para ver o versículo.", 
        reference: "Sistema", 
        version: "Offline" 
    };
  }

  try {
    const prompt = `
      Select a random, encouraging Bible verse.
      
      Language Requirement:
      - Return the verse in the language corresponding to code: "${langCode}".
      
      Version Requirement:
      - If Portuguese, use 'Nova Versão Internacional' (NVI).
      - If English, use 'New International Version' (NIV).
      - If Spanish, use 'Nueva Versión Internacional' (NVI).
      - If Japanese, use 'Shinkaiyaku' or a standard modern equivalent.
      
      Output JSON Format:
      {
        "text": "The verse text...",
        "reference": "Book Chapter:Verse",
        "version": "NVI" (or appropriate version acronym)
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            reference: { type: Type.STRING },
            version: { type: Type.STRING }
          },
          required: ['text', 'reference', 'version']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(cleanJson(text));
  } catch (error) {
    console.error("Verse generation error:", error);
    // Fallback based on language if AI fails
    if (langCode.includes('pt')) {
      return { 
        text: "O Senhor é o meu pastor; de nada terei falta.", 
        reference: "Salmos 23:1", 
        version: "NVI" 
      };
    }
    return { 
      text: "The Lord is my shepherd, I lack nothing.", 
      reference: "Psalm 23:1", 
      version: "NIV" 
    };
  }
};
