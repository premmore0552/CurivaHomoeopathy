
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function aiSearch(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search the homeopathic database for: "${query}". 
      Return a JSON array of up to 5 suggested remedies or articles.
      Include a "reason" field explaining why it matches.
      
      Format: [ { "title": "Remedy Name", "type": "remedy", "link": "/remedy/remedy-id", "reason": "Match reason" } ]`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              type: { type: Type.STRING },
              link: { type: Type.STRING },
              reason: { type: Type.STRING }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
}

export async function analyzeSymptoms(symptoms: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyse these symptoms for homeopathic remedies: "${symptoms}".
      Suggest top 3 remedies and explain the differential logic part.
      
      Format: [ { "remedy": "Name", "logic": "Explain why", "keynotes": ["symptom1", "symptom2"] } ]`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              remedy: { type: Type.STRING },
              logic: { type: Type.STRING },
              keynotes: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return [];
  }
}

export async function runCaseSimulationTurn(messages: any[], targetRemedy: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: 'user',
          parts: [{ text: `You are a patient in a homeopathic clinic. 
          Your secret condition is BEST treated by the remedy: ${targetRemedy}.
          
          Guidelines:
          1. Act like a real person, using conversational language, not medical jargon.
          2. Reveal symptoms gradually. Don't dump everything at once.
          3. If the user asks about your symptoms, reveal specific keynotes of ${targetRemedy}.
          4. Be consistent with the personality type typically associated with ${targetRemedy} (e.g. if Pulsatilla, be gentle/weepy; if Nux Vomica, be irritable).
          5. Stay in character at all times.
          
          Context of previous conversation:
          ${JSON.stringify(messages.slice(-5))}
          ` }]
        }
      ]
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Simulation Error:", error);
    return "The patient is lost in thought... (Connection Error)";
  }
}

export async function getSimulationFeedback(targetRemedy: string, userPrescription: string, sessionSummary: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Evaluate the student's prescription.
      Target Remedy: ${targetRemedy}
      Student's Prescription: ${userPrescription}
      Case Summary: ${sessionSummary}
      
      Provide a constructive critique in JSON format.
      Include a "score" (0-100), "strengths", "weaknesses", and "lesson" (key takeaway).
      
      Format: { "score": number, "strengths": string[], "weaknesses": string[], "lesson": string }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            lesson: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Feedback Error:", error);
    return { score: 0, strengths: [], weaknesses: [], lesson: "Error generating feedback." };
  }
}
