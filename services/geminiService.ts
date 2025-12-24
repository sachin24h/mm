
import { GoogleGenAI, Type } from "@google/genai";
import { PlatformType, ContextType, MarginData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const checkPlatformUpdates = async (platform: PlatformType, context: ContextType) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for the latest UI changes and safe margin dimensions for ${platform} ${context} as of late 2024 and 2025. 
      Specifically check for any changes in the bottom navigation height, comment section overlays, or side-bar button placements on iOS vs Android. 
      Provide a JSON response with suggested updated margins (percentages).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedUpdate: {
              type: Type.OBJECT,
              properties: {
                top: { type: Type.NUMBER },
                bottom: { type: Type.NUMBER },
                left: { type: Type.NUMBER },
                right: { type: Type.NUMBER },
                reason: { type: Type.STRING }
              },
              required: ["top", "bottom", "left", "right", "reason"]
            }
          },
          required: ["suggestedUpdate"]
        }
      }
    });

    return JSON.parse(response.text).suggestedUpdate;
  } catch (error) {
    console.error("Error checking platform updates:", error);
    return null;
  }
};
