import { validateAcademicAiText } from "../server/aiPrivacyGuard";

/**
 * Client-side Gemini API Service.
 * Proxies calls to the Express server to prevent exposing API keys to the browser
 * and to avoid running server-side SDKs in the browser container.
 */

export async function aiSearch(query: string) {
  try {
    const res = await fetch("/api/gemini/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error("Failed to search");
    return await res.json();
  } catch (error) {
    console.error("aiSearch fallback:", error);
    return [];
  }
}

export async function analyzeSymptoms(_symptoms: string) {
  // Individual symptom-to-remedy analysis is intentionally disabled. Do not
  // transmit patient or personal health narratives to the server or an AI.
  return [];
}

export async function runCaseSimulationTurn(messages: any[], targetRemedy: string) {
  const latestText = messages.map(message => typeof message?.content === 'string' ? message.content : '').join('\n');
  if (!validateAcademicAiText(latestText, 6000).ok) {
    return "This fictional study simulator does not accept personal, identifying or health information. Your text was not sent. Use only generic academic exercise prompts.";
  }
  try {
    const res = await fetch("/api/gemini/case-simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, targetRemedy }),
    });
    if (!res.ok) throw new Error("Failed to run turn");
    const data = await res.json();
    return data.text;
  } catch (error) {
    console.error("runCaseSimulationTurn fallback:", error);
    return "The patient is lost in thought... (Connection Error)";
  }
}

export async function getSimulationFeedback(targetRemedy: string, userPrescription: string, sessionSummary: string) {
  if (!validateAcademicAiText(userPrescription, 500).ok ||
      (sessionSummary.trim().length > 0 && !validateAcademicAiText(sessionSummary, 3000).ok)) {
    return { score: 0, strengths: [], weaknesses: [], lesson: "Feedback is disabled for personal or clinical records. Use only fictional academic exercise text." };
  }
  try {
    const res = await fetch("/api/gemini/simulation-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetRemedy, userPrescription, sessionSummary }),
    });
    if (!res.ok) throw new Error("Failed to get feedback");
    return await res.json();
  } catch (error) {
    console.error("getSimulationFeedback fallback:", error);
    return { score: 0, strengths: [], weaknesses: [], lesson: "Error generating feedback." };
  }
}
