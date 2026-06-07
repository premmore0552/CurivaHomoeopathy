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

export async function analyzeSymptoms(symptoms: string) {
  try {
    const res = await fetch("/api/gemini/analyze-symptoms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms }),
    });
    if (!res.ok) throw new Error("Failed to analyze");
    return await res.json();
  } catch (error) {
    console.error("analyzeSymptoms fallback:", error);
    return [];
  }
}

export async function runCaseSimulationTurn(messages: any[], targetRemedy: string) {
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
