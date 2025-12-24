
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful, friendly AI assistant integrated into SkyChat, a modern messaging app. Keep your responses concise and mobile-friendly.",
        temperature: 0.7,
      },
    });

    // Accessing .text property directly as per latest SDK guidelines.
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Could not connect to AI services. Please check your API key.";
  }
};
