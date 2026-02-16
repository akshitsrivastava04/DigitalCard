
import { GoogleGenAI, Type } from "@google/genai";
import { ProfileData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProfessionalPitch = async (profile: ProfileData) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a high-impact, futuristic elevator pitch (max 40 words) for a professional with the following details: 
      Name: ${profile.name}
      Specialty: ${profile.role}
      Key Experience: ${profile.experience}
      Website: ${profile.website}
      
      Focus on the intersection of AI Engineering and Space Tech (ISRO). Include 3 relevant technical keywords.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pitch: { type: Type.STRING },
            keywords: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["pitch", "keywords"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      pitch: "Passionate AI Engineer exploring the frontier of machine learning and space technology through rigorous research.",
      keywords: ["Machine Learning", "Computer Vision", "Space Tech"]
    };
  }
};
