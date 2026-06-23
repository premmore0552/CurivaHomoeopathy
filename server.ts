import express from "express";
import { createServer as createViteServer } from "vite";
import { allBlogPosts } from "./src/data/blogPosts";
import path from "path";
import { fileURLToPath } from "url";
import Razorpay from "razorpay";
import crypto from "crypto";
import { GoogleGenAI, Type } from "@google/genai";

// Safe path resolution for both ES modules and CommonJS
const getDirNameAndFileName = () => {
  try {
    if (typeof __filename !== "undefined" && typeof __dirname !== "undefined" && __filename && __dirname) {
      return { filename: __filename, dirname: __dirname };
    }
  } catch (e) {}

  try {
    if (typeof import.meta !== "undefined" && import.meta.url) {
      const filename = fileURLToPath(import.meta.url);
      const dirname = path.dirname(filename);
      return { filename, dirname };
    }
  } catch (e) {}

  const cwd = process.cwd();
  return { filename: path.join(cwd, "server.ts"), dirname: cwd };
};

const { filename: __filename, dirname: __dirname } = getDirNameAndFileName();

// Initialize Razorpay lazily to avoid crash if keys are missing
let razorpayInstance: Razorpay | null = null;

function getRazorpay() {
  if (!razorpayInstance) {
    const keyId = process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!keyId || !keySecret) {
      console.warn("Razorpay API keys are missing. Payment features will be disabled.");
      return null;
    }
    
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpayInstance;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Database setup (Pure JS In-Memory representation)
  // Helper to generate slug
  const generateSlug = (title: string, id: string) => {
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    return `${slug}-${id.substring(0, 5)}`;
  };

  // Helper to estimate reading time
  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / wordsPerMinute))} min read`;
  };

  const postsDb: any[] = allBlogPosts.map(post => {
    const slug = (post as any).slug || generateSlug(post.title, post.id);
    return {
      id: post.id,
      slug: slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      category: post.category,
      image: post.image,
      tags: post.tags || [],
      readingTime: estimateReadingTime(post.content),
      seoTitle: post.seoTitle || null,
      quickSummary: (post as any).quickSummary || [],
      keyPatterns: (post as any).keyPatterns || [],
      whoItSuits: (post as any).whoItSuits || null,
      whenToConsider: (post as any).whenToConsider || [],
      modalities: (post as any).modalities || { better: [], worse: [] },
      comparisons: (post as any).comparisons || [],
      relatedCarePlans: (post as any).relatedCarePlans || [],
      citations: (post as any).citations || [],
      relatedRemedies: (post as any).relatedRemedies || [],
      relatedConditions: (post as any).relatedConditions || []
    };
  });

  console.log("Database seeded with", postsDb.length, "posts in-memory.");

  app.use(express.json());
  
  // API endpoint for simulated email delivery of resources
  app.post("/api/send-resource-email", async (req, res) => {
    const { email, resourceId, resourceTitle } = req.body;
    
    console.log(`[Email Service] Sending resource ${resourceTitle} (${resourceId}) to ${email}`);
    
    // Simulate some delay for email processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    res.json({ 
      success: true, 
      message: `The ${resourceTitle} has been sent to ${email} successfully.` 
    });
  });

  // Razorpay Order Creation
  app.post("/api/create-razorpay-order", async (req, res) => {
    const { amount, currency = "INR", receipt } = req.body;
    
    const razorpay = getRazorpay();
    if (!razorpay) {
      return res.status(500).json({ error: "Razorpay is not configured" });
    }

    try {
      const finalAmount = Math.round(Number(amount) * 100);
      
      if (isNaN(finalAmount) || finalAmount < 100) {
        return res.status(400).json({ error: "Invalid amount. Minimum ₹1 is required." });
      }

      // Razorpay receipt has a limit of 40 characters
      const rawReceipt = receipt || `receipt_${Date.now()}`;
      const finalReceipt = rawReceipt.length > 40 ? rawReceipt.substring(0, 37) + "..." : rawReceipt;

      const options = {
        amount: finalAmount,
        currency,
        receipt: finalReceipt,
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error: any) {
      console.error("Razorpay Order Error Details:", JSON.stringify(error, null, 2));
      res.status(500).json({ 
        error: "Failed to create payment order", 
        details: error.error?.description || error.message || "Unknown error"
      });
    }
  });

  // Razorpay Payment Verification
  app.post("/api/verify-razorpay-payment", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return res.status(500).json({ error: "Payment verification failed: missing configuration" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  });

  // Gemini Proxy API Endpoints
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  function appendReferenceLinks(text: string, queryText: string = ""): string {
    const combined = (text + " " + queryText).toLowerCase();
    const matched: { name: string; path: string; category: string }[] = [];

    const REFERENCE_CATALOG: Record<string, { name: string; path: string; category: string }> = {
      "lycopodium": { name: "Lycopodium Clavatum", path: "/read/lycopodium-profile", category: "Constitutional Profile" },
      "pulsatilla": { name: "Pulsatilla Nigricans", path: "/read/pulsatilla-profile", category: "Constitutional Profile" },
      "arsenicum": { name: "Arsenicum Album", path: "/read/arsenicum-profile", category: "Constitutional Profile" },
      "gelsemium": { name: "Gelsemium Sempervirens", path: "/read/gelsemium-profile", category: "Constitutional Profile" },
      "aconite": { name: "Aconitum Napellus", path: "/read/aconite-profile", category: "Constitutional Profile" },
      "aconitum": { name: "Aconitum Napellus", path: "/read/aconite-profile", category: "Constitutional Profile" },
      "belladonna": { name: "Belladonna", path: "/read/belladonna-profile", category: "Constitutional Profile" },
      "bryonia": { name: "Bryonia Alba", path: "/read/bryonia-profile", category: "Constitutional Profile" },
      "ignatia": { name: "Ignatia Amara", path: "/read/ignatia-profile", category: "Constitutional Profile" },
      "sulphur": { name: "Sulphur", path: "/read/sulphur-profile", category: "Constitutional Profile" },
      "nux vomica": { name: "Nux Vomica", path: "/read/nux-vomica-profile", category: "Constitutional Profile" },
      "nux-vomica": { name: "Nux Vomica", path: "/read/nux-vomica-profile", category: "Constitutional Profile" },
      "rhus tox": { name: "Rhus Toxicodendron", path: "/read/rhus-tox", category: "Constitutional Profile" },
      "rhus-tox": { name: "Rhus Toxicodendron", path: "/read/rhus-tox", category: "Constitutional Profile" },
      "natrum mur": { name: "Natrum Muriaticum", path: "/read/natrum-muriaticum", category: "Constitutional Profile" },
      "nat-mur": { name: "Natrum Muriaticum", path: "/read/nat-mur-profile", category: "Constitutional Profile" },
      "sepia": { name: "Sepia Officinalis", path: "/read/sepia", category: "Constitutional Profile" },
      "hair loss": { name: "Hair Loss, Alopecia & Thinning Guide", path: "/read/hair-loss-homeopathy", category: "Therapeutics Guide" },
      "alopecia": { name: "Hair Loss, Alopecia & Thinning Guide", path: "/read/hair-loss-homeopathy", category: "Therapeutics Guide" },
      "hair fall": { name: "Hair Loss, Alopecia & Thinning Guide", path: "/read/hair-loss-homeopathy", category: "Therapeutics Guide" },
      "anxiety": { name: "Anxiety & Mental Strain Study", path: "/read/anxiety-homeopathy-deep", category: "Therapeutics Guide" },
      "depression": { name: "Depression & Chronic Mood Guide", path: "/read/depression-homeopathy", category: "Therapeutics Guide" },
      "eczema": { name: "Eczema & Dermatitis Therapeutics", path: "/read/eczema-homeopathy", category: "Therapeutics Guide" },
      "asthma": { name: "Asthma & Bronchial Spasms Guide", path: "/read/asthma-homeopathy", category: "Therapeutics Guide" },
      "migraine": { name: "Migraines & Periodic Headaches", path: "/read/migraine-homeopathy", category: "Therapeutics Guide" },
      "insomnia": { name: "Insomnia & Sleep Disturbances", path: "/read/insomnia-homeopathy", category: "Therapeutics Guide" },
      "gastritis": { name: "Gastritis & Acid Reflux Study", path: "/read/gastritis-homeopathy", category: "Therapeutics Guide" },
      "psoriasis": { name: "Psoriasis & Scalp Plaques Guide", path: "/read/psoriasis-homeopathy", category: "Therapeutics Guide" },
      "organon": { name: "Organon of Medicine & Hahnemannian Philosophy", path: "/lexicon/philosophy", category: "Academic Reference" },
      "aphorism": { name: "Organon of Medicine & Hahnemannian Philosophy", path: "/lexicon/philosophy", category: "Academic Reference" },
      "remedy relationship": { name: "Relationship Visualizer", path: "/nexus", category: "Study Tool" },
      "relationship visualizer": { name: "Relationship Visualizer", path: "/nexus", category: "Study Tool" },
      "repertory": { name: "Classical Repertory Analysis Tool", path: "/repertory", category: "Study Tool" },
      "symptom checker": { name: "Symptom-to-Rubric Checker", path: "/symptom-checker", category: "Diagnostic Tool" },
      "clinical-ai": { name: "AI Clinical Pro Tools Suite", path: "/clinical-ai", category: "Diagnostic Tool" },
      "mcq": { name: "Live MCQ Question Practice Board", path: "/mcq-practice" , category: "Academic Prep" },
      "career": { name: "BHMS Career Path & Scope Guide", path: "/read/bhms-career", category: "Academic Guide" },
      "anatomy": { name: "First-Year Anatomy Integrated Guide", path: "/read/bhms-anatomy", category: "Anatomy Blueprint" },
      "physiology": { name: "First-Year Physiology Integrated Guide", path: "/read/bhms-physiology", category: "Physiology Blueprint" },
      "research": { name: "High-Dilution Clinical Homoeopathic Evidence", path: "/read/research-homeopathy-evidence", category: "Research Reference" }
    };

    // Find matches
    for (const [key, value] of Object.entries(REFERENCE_CATALOG)) {
      if (combined.includes(key)) {
        // Avoid duplicate paths
        if (!matched.some(m => m.path === value.path)) {
          matched.push(value);
        }
      }
      if (matched.length >= 4) break; // Limit to up to 4 references
    }

    // Default general references if none matched
    if (matched.length === 0) {
      matched.push({ name: "Homoeopathic Encyclopedia", path: "/lexicon/all", category: "Verified Registry" });
      matched.push({ name: "Organon of Medicine & Hahnemannian Philosophy", path: "/lexicon/all", category: "Academic Reference" });
    }

    // Construct beautiful markdown block at the bottom
    let referenceSection = `\n\n---\n\n### 📚 Verified Encyclopedia & Reference Sources:\n*Verify case characteristics and study guidelines directly from our peer-reviewed college curriculum:*`;
    
    matched.forEach(ref => {
      referenceSection += `\n- **[${ref.name}](${ref.path})** (${ref.category}) — Click to view authentic textbook profiles and verify accuracy.`;
    });

    return text + referenceSection;
  }

  app.post("/api/gemini/curiva-care", async (req, res) => {
    try {
      const { prompt, conversationHistory } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const curivaCareSystemInstruction = `
        You are the ✨ Curiva Homeopathic Consultation Companion, an empathetic, highly knowledgeable, and professional classical homeopath.
        You represent Curiva's clinical homeopathic advisory team designed to support patient understanding around classical homeopathic science, organon principles, and constitutional remedy dynamics.
        
        CRITICAL RESPONSE INSTRUCTIONS:
        1. BE PERFECT & BRIEF: Always keep your responses very short, concise, and focused. Limit your primary response to a maximum of 100-120 words (1-2 small paragraphs or a few key bullet points).
        2. DEPTH RESTRICTION: Only provide long paragraphs, detailed essays, or exhaustive texts if the user explicitly asks for "long text", "long explanation", "detailed report", or similar keywords.
        3. WEBPAGE CITATION: You MUST link to the website's relevant pages using markdown link format: [Page Title](url). Always include 1 or 2 relevant links from the authorized index below in every response. Make sure links are integrated naturally inside your educational replies!

        AUTHORIZED CONTENT SITE MAP & INDEX:
        - Constitutional Remedy Profiles:
          * Lycopodium Clavatum (lack of confidence, warm sweets): '/read/lycopodium-profile'
          * Pulsatilla Nigricans (changeable symptoms, mild, weeping): '/read/pulsatilla-profile'
          * Arsenicum Album (high anxiety, restlessness, chilly): '/read/arsenicum-profile'
          * Gelsemium Sempervirens (dullness, dizziness, drowsiness): '/read/gelsemium-profile'
          * Aconitum Napellus (sudden acute panic and fears): '/read/aconite-profile'
          * Belladonna (sudden heat, fever, redness): '/read/belladonna-profile'
          * Bryonia Alba (dryness, pain worse with any motion): '/read/bryonia-profile'
          * Ignatia Amara (grief, silent sorrow, emotional contradictions): '/read/ignatia-profile'
          * Sulphur (intellectual, ragged philosopher, hot feet): '/read/sulphur-profile'
          * Nux Vomica (digestive issues, sedentary, oversensitive): '/read/nux-vomica-profile'
          * Rhus Toxicodendron (restlessness, joints stiff but better moving): '/read/rhus-tox' or '/read/rhus-tox-profile'
          * Natrum Muriaticum (suppressed deep sorrow, craves salt): '/read/natrum-muriaticum' or '/read/nat-mur-profile'
          * Sepia Officinalis (indifference to loved ones, bearing down pain): '/read/sepia'
        - Common Ailments Treatment Pages:
          * Hair Loss, Alopecia & Thinning: '/read/hair-loss-homeopathy'
          * Anxiety & Mental Strain: '/read/anxiety-homeopathy-deep'
          * Depression & Chronic Low Mood: '/read/depression-homeopathy'
          * Eczema & Chronic Dermatitis: '/read/eczema-homeopathy'
          * Asthma, Bronchial Spasms: '/read/asthma-homeopathy'
          * Migraines & Periodic Headaches: '/read/migraine-homeopathy'
          * Insomnia & High Sleep Disturbances: '/read/insomnia-homeopathy'
          * Gastritis, Acid Reflux & Bloating: '/read/gastritis-homeopathy'
          * Psoriasis & Scalp Plaques: '/read/psoriasis-homeopathy'
        - Academy Studies & Study Tools:
          * Organon & Core Hahnemannian Philosophy: '/lexicon/philosophy' or '/organon-philosophy'
          * Treatments Lounge & Case Management: '/lexicon/clinical'
          * Live Interactive MCQ Board Practice: '/mcq-practice'
          * Complete BHMS Career paths & scope: '/read/bhms-career'
          * First Year Anatomy Guidelines: '/read/bhms-anatomy'
          * First Year Physiology Guidelines: '/read/bhms-physiology'
          * Scientific Evidence & High-Dilution Research: '/read/research-homeopathy-evidence'
          * AI Professional Diagnostics Suite: '/clinical-ai'
          * Free Symptom-to-Rubric Checker: '/symptom-checker'

        For example, if someone asks about Gelsemium, keep the explanation clear, mention it is detailed in Gelsemium Sempervirens and insert '/read/gelsemium-profile' inside a beautiful link format. Always prioritize accuracy, and stay within the word limit!
      `;

      const ai = getGeminiClient();
      
      const contents: any[] = [];
      if (conversationHistory && Array.isArray(conversationHistory)) {
        conversationHistory.forEach((msg: any) => {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: prompt }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: curivaCareSystemInstruction
        }
      });

      const rawText = response?.text || "";
      const textWithLinks = rawText ? appendReferenceLinks(rawText, prompt) : "No response received from homeopathic consultant.";
      res.json({ text: textWithLinks });
    } catch (error: any) {
      console.error("Gemini Curiva Care Proxy Error:", error);
      res.status(500).json({ error: error.message || "Failed to process homeopathic query" });
    }
  });

  app.post("/api/gemini/hair-loss-coach", async (req, res) => {
    try {
      const { prompt, type, conversationHistory } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const coachSystemInstruction = `
        You are the ✨ Curiva AI Scalp Coach, an empathetic, science-based, and holistic hair wellness advisor built by Curiva Homoeopathy. 
        Your guidance must directly reflect the philosophy in the 'Hair Fall Recovery Guide' eBook:
        - Real recovery is built from the bottom up: Sleep (Foundation), Nutrition (especially Protein), Stress Management, Hydration, and Scalp Care.
        - Hair is non-essential for survival; the body starves the hair first under stress or nutritional lack.
        - Demystify magic products, shampoo switching, and rapid quick-fixes.
        - Explain traditional homeopathic perspectives (like individualization and constitutional support) in a balanced, grounded way.
        - Encourage clinical investigations (blood checks for Iron/Ferritin, Vitamin D, B12, Thyroid, PCOS) for chronic issues.
        - Always maintain a warm, friendly, companionable tone. Do not prescribe specific clinical drugs, but act as a coaching companion.
        Keep answers conversational, positive, and formatted with light markdown where useful. Output should be straight advice, maximum 2-3 logical paragraphs or clear bullet lists.
      `;

      const blueprintSystemInstruction = `
        You are the ✨ Curiva AI Blueprint Generator. Based on the user's details (diet, sleep, stress, lifestyle), generate a beautifully structured 7-day personalized Hair Recovery Plan.
        Align directly with the Curiva philosophy (Holistic, bottom-up priority starting with Sleep & Nutrition, demystifying quick fixes).
        Keep the steps concise, practical, highly encouraging, and realistic. Use markdown headings (##, ###) and clean bullet lists (-). Only print the plan, without administrative chatter.
      `;

      const instruction = type === "blueprint" ? blueprintSystemInstruction : coachSystemInstruction;

      const ai = getGeminiClient();
      
      const contents: any[] = [];
      if (conversationHistory && Array.isArray(conversationHistory)) {
        conversationHistory.forEach((msg: any) => {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: prompt }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: instruction
        }
      });

      const rawText = response?.text || "";
      const textWithLinks = rawText ? appendReferenceLinks(rawText, prompt) : "No response received from AI coach.";
      res.json({ text: textWithLinks });
    } catch (error: any) {
      console.error("Gemini Hair Loss Coach Proxy Error:", error);
      res.status(500).json({ error: error.message || "Failed to process coach query" });
    }
  });

  app.post("/api/gemini/search", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ error: "Query is required" });
      }
      
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
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

      if (response && response.text) {
        return res.json(JSON.parse(response.text));
      }
      return res.json([]);
    } catch (error: any) {
      console.error("Gemini Search Proxy Error:", error);
      res.status(500).json({ error: error.message || "Failed to process search" });
    }
  });

  app.post("/api/gemini/analyze-symptoms", async (req, res) => {
    try {
      const { symptoms } = req.body;
      if (!symptoms) {
        return res.status(400).json({ error: "Symptoms are required" });
      }

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
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

      if (response && response.text) {
        return res.json(JSON.parse(response.text));
      }
      return res.json([]);
    } catch (error: any) {
      console.error("Gemini Analyse Symptoms Proxy Error:", error);
      res.status(500).json({ error: error.message || "Failed to analyze symptoms" });
    }
  });

  app.post("/api/gemini/case-simulation", async (req, res) => {
    try {
      const { messages, targetRemedy } = req.body;
      if (!targetRemedy) {
        return res.status(400).json({ error: "Target remedy is required" });
      }

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: `You are a patient in a homeopathic clinic. 
            Your secret condition is BEST treated by the remedy: ${targetRemedy}.
            
            Guidelines:
            1. Act like a real person, using conversational language, not medical jargon.
            2. Reveal symptoms gradually. Don't dump everything at once.
            3. If the user asks about your symptoms, reveal specific keynotes of ${targetRemedy}.
            4. Be consistent with the personality type typically associated with ${targetRemedy} (e.g. if Pulsatilla, be gentle/weepy; if Nux Vomica, be irritable).
            5. Stay in character at all times.
            
            Context of previous conversation:
            ${JSON.stringify((messages || []).slice(-5))}
            ` }]
          }
        ]
      });

      return res.json({ text: response?.text || "" });
    } catch (error: any) {
      console.error("Gemini Case Simulation Proxy Error:", error);
      res.status(500).json({ error: error.message || "Failed to prompt simulation" });
    }
  });

  app.post("/api/gemini/simulation-feedback", async (req, res) => {
    try {
      const { targetRemedy, userPrescription, sessionSummary } = req.body;
      if (!targetRemedy || !userPrescription) {
        return res.status(400).json({ error: "Target remedy and user prescription are required" });
      }

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Evaluate the student's prescription.
        Target Remedy: ${targetRemedy}
        Student's Prescription: ${userPrescription}
        Case Summary: ${sessionSummary || ""}
        
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

      if (response && response.text) {
        return res.json(JSON.parse(response.text));
      }
      return res.json({ score: 0, strengths: [], weaknesses: [], lesson: "" });
    } catch (error: any) {
      console.error("Gemini Feedback Proxy Error:", error);
      res.status(500).json({ error: error.message || "Failed to evaluate prescription" });
    }
  });

  app.post("/api/gemini/professional-tool", async (req, res) => {
    try {
      const { toolType, payload } = req.body;
      if (!toolType || !payload) {
        return res.status(400).json({ error: "toolType and payload are required" });
      }

      const ai = getGeminiClient();
      let promptText = "";
      let systemInstruction = "You are an elite clinical advisor for professional homeopathic medical practitioners. You provide extremely precise, perfect, evidence-guided, and non-generalized responses. Always retain high medical precision. CRITICAL RULE: Keep your response elegant, compact, and highly scannable. Write your clinical analysis or tutoring highlights with concise wording (aiming for less than 150 words by default) unless the user's specific query has explicitly requested a long explanations, an exhaustive board paper essay, or a detailed narrative report.";

      if (toolType === "simillimum") {
        const { complaint, modalities, mentals, thermal, thirst, cravings } = payload;
        promptText = `
          You are analyzing an advanced constitutional case mapping.
          
          Please evaluate the following clinical inputs:
          - Main Complaint: ${complaint || "None specified"}
          - Modalities (Aggravations/Ameliorations): ${modalities || "None specified"}
          - Mental & Emotional State: ${mentals || "None specified"}
          - Thermal Reaction: ${thermal || "None specified"}
          - Thirst State: ${thirst || "None specified"}
          - Food cravings & Aversions: ${cravings || "None specified"}

          Provide a exhaustive, clinical-grade analysis. Avoid conversational 'fluff'. Your output must be deeply academic and structured into the following distinct sections:
          
          1. 📋 **Case Synthesis & Dynamic Interpretation**: Discuss the pathophysiology, the energetic state of the vital force, and how the physical symptoms relate to the emotional symptoms.
          2. 🔢 **Repertory Rubric Selection**: Provide a clear Markdown table mapping which rubrics from Kent, Boericke, or Boger Repertories represent this patient, along with mathematical weights (+3, +2, or +1).
          3. 🌟 **The True Simillimum**: Identify the primary constitutional remedy that covers the symptom outline. Fully justify this selection based on unique modalities (e.g. thermal reaction, cravings, or mental state) that make this remedy a perfect fit. 
          4. 🧪 **Differential Diagnosis & Sibling Remedies**: Create a differential matrix separating the selected remedy from at least 2 sibling remedies, demonstrating how specific modalities (such as cold aggravation, thirstlessness, or left-sided tendencies) successfully rule them out.
          5. 📦 **Posology & Potency Strategy**: Suggest a starting potency schema (e.g., LM/Q potencies vs Centesimal 30C/200C/1M), include initial dosage frequencies, and outline clear clinical indicators for repetition or holding based on Hering's Laws.
        `;
      } else if (toolType === "miasmatic") {
        const { familyHistory, suppressedEruptions, pathology, mentalMiasm } = payload;
        promptText = `
          You are an expert homeopath specializing in chronic disease layers and miasmatic diagnosis. 
          
          Identify the dominant active miasm (Psora, Sycosis, Syphilis, Tubercular, or Cancer) based on the following patient attributes:
          - Family / Genetic Disease History: ${familyHistory || "None specified"}
          - History of Suppressed Skin Conditions, Chemotherapy, or Surgeries: ${suppressedEruptions || "None specified"}
          - Organic Pathology & Structural Changes: ${pathology || "None specified"}
          - Dominant Mental Disposition: ${mentalMiasm || "None specified"}

          Provide a thorough clinical response, organized into the following distinct sections:
          
          1. 🦠 **Active Miasmatic Profiling**: Define which miasm (Psora, Sycosis, Syphilis, Tubercular, or Cancer) represents the patient's current disease expression, and details the reasoning.
          2. Histogenetic Markers: Highlight the hereditary pathology and suppressed history lines that support this diagnosis.
          3. 💊 **Intercurrent Anti-Miasmatic Clearance**: Recommend a profound anti-miasmatic nosode or intercurrent remedy (such as Psorinum, Medorrhinum, Syphilinum, Tuberculinum) with potency and timing guidelines.
          4. 🔄 **Hering's Law Verification Parameters**: Explain the expected sequence of symptom manifestations (e.g., skin eruptions returning, symptoms moving from within-outwards) that prove the curative reaction is proceeding in the right direction.
        `;
      } else if (toolType === "differentiation") {
        const { remedyA, remedyB, clinicalContext } = payload;
        promptText = `
          You are a master of comparative homeopathic Materia Medica.
          
          Provide a highly rigorous, 200% customized clinical comparison between:
          - Candidate Remedy A: ${remedyA || "None specified"}
          - Candidate Remedy B: ${remedyB || "None specified"}
          - Patient's Specific Clinical Presentation: ${clinicalContext || "None specified"}

          Structure your differential comparison under the following clear clinical sections:
          
          1. 🔍 **Core Portrait Contrast**: Contrast the fundamental archetypes, speed of action, and deep psychological drivers of both remedies.
          2. ⚖️ **Modality Differentiating Table**: Provide a clean comparison table highlighting the exact key differences in:
             - Thermal Reactions (Chilly vs Hot)
             - Thirst Levels
             - Laterality & Side Affinity
             - Times of Amelioration / Aggravation
             - Emotional / Cognitive Temperament
          3. 🔑 **The Clinical 'Clincher' Keynote**: Identify the exact, unique keynote modalities or symptoms that would instantly direct a homeopath to prescribe Remedy A over Remedy B (or vice-versa) in the patient's context.
        `;
      } else if (toolType === "materia-medica") {
        const { remedyName, level } = payload;
        promptText = `
          Provide an exhaustive, multi-tier analysis of the homeopathic remedy: **${remedyName}** at the **${level || "Advanced Exam"}** level.
          
          Your response MUST be organized under these distinct, academic headers:
          
          1. 🌟 **The Remedy Portrait (Archetype)**: Fundamental clinical essence, source, and vital power.
          2. 🔑 **Clinical Keynotes & Modalities**: Chief characteristic symptoms and exact aggravation/amelioration parameters.
          3. 🧬 **Generals & Particulars**: Physical generals (thermals, thirst, sleep, side affinities) and localized organ particulars.
          4. 🤝 **Drug Relationships**: Sibling remedies, complementary, inimical, antidotes, and concordances.
          5. 🏺 **Constitution & Active Miasm**: Physical makeup, temperament, and underlying miasmatic (Psoric/Sycotic/Syphilitic) axis.
          6. 🎯 **Clinical Indications**: Specific pathological diseases and conditions where this remedy has proven high therapeutic affinity.
          7. 💡 **Memory Tricks & Mnemonic Anchors**: Catchy, creative phrases or visual narratives to memorize the main keynotes.
          8. 🎤 **Viva Questions (Oral Exam Practice)**: 3 high-yield questions often asked by college examiners, with professional model answers.
          9. 🏆 **AIAPGET High-Yield Points**: Quick bullet points highlighting specific exam-focused historical questions, provers, and drug families.
          10. ⚖️ **Comparative Mini-Differentiations**: Side-by-side contrast with 2 of its closest clinical companion remedies.
        `;
      } else if (toolType === "repertory") {
        const { symptoms } = payload;
        promptText = `
          You are an expert Homeopathic Repertory Analyst translating natural patient symptoms into precise classical repertory rubrics.
          
          Review these symptoms: "${symptoms}"
          
          Provide a highly structured, clinical-grade analysis:
          1. 📖 **Rubric Translation Table**: Formulate a Markdown table containing:
             - The plain symptom described by the patient
             - The corresponding Kent, Boericke, or Synthesis Repertory rubric (formatted correctly as CHAPTER - Core - Sub-modifier, e.g. MIND - WEAKNESS - memory, of)
             - The level of clinical graduation/weight (Graduation: 3 = Bold, 2 = Italic, 1 = Roman)
          2. 🔮 **High-Affinity Remedy Suggestions**: Rank the top 4 remedies covering this collective dynamic.
          3. 🧠 **Clinical Selection Logic**: Explain why each rubric was selected and how different potencies might affect the symptom expression.
        `;
      } else if (toolType === "rubric-finder") {
        const { plainTextQuery } = payload;
        promptText = `
          You are an advanced Rubric Finder and Interpretation Engine.
          
          Search and interpret homeopathic rubrics matching: "${plainTextQuery}"
          
          Provide an exhaustive academic analysis:
          1. 🔍 **Rubric Hierarchy Tree**: Generate a detailed multi-level listing from Kent's, Boericke's, or Boger-Boenninghausen's repertories. Let the chain be complete (e.g., HEAD - PAIN - morning - waking, on).
          2. 📝 **Interpretation & Nuance**: Explain what each rubric means clinically, highlighting subtle differences of adjacent modifier keywords.
          3. 🔄 **Cross-References / Related Rubrics**: Suggest related or similar rubrics from different chapters that could catch similar symptom profiles (e.g. comparing Mind vs Physical chapters).
        `;
      } else if (toolType === "clinical-analyzer") {
        const { caseText } = payload;
        promptText = `
          You are a clinical homeopath evaluating a complex case file for educational analysis.
          
          Case Detail:
          "${caseText}"
          
          Analyze the case according to the rules of classical homeopathic case synthesis:
          1. 📝 **Symptom Classification**: Systematically extract and list:
             - Mental Generals (Emotional/Intellectual)
             - Physical Generals (Appetite, Thirst, Thermals, Sleep, Sides)
             - Local Particulars
             - Peculiar/Rare/Characteristic Symptoms (Section 153 of Organon)
             - Modalities
          2. 🗺️ **Miasmatic Evaluation & Layer Analysis**: Analyze whether this is a single acute outbreak, a chronic layered presentation, or has suppressed pharmacological drug layers.
          3. 🌟 **The Diagnostic Synthesis**: Recommend 3 candidate remedies, provide detailed comparative pros/cons, and identify the single ultimate *Simillimum*.
          4. 🧪 **Prescribing Blueprint**: Specify target potency (e.g., 30C, 200C, or LM scales), repetition schedule, and indicators representing curative response vs. aggravations.
        `;
      } else if (toolType === "viva-examiner") {
        const { topic, difficulty, userResponseText, questionIndex } = payload;
        promptText = `
          You are an elite, highly encouraging yet demanding Homeopathic Viva (Oral Examination) Examiner for BHMS medical college students.
          
          Topic: ${topic || "Materia Medica Keynotes"}
          Difficulty: ${difficulty || "Intermediate"}
          Current Question Index: ${questionIndex || 1}
          Student's Prior Input: "${userResponseText || "None (Just beginning the exam)"}"

          If this is the start (student prior input is empty or "None"):
          1. Pose a highly pertinent, challenging oral viva question regarding the topic. Keep it realistic.
          2. Remind the student of oral presentation best practices.
          
          If this is a follow-up (student has answered):
          1. ⭐️ **Evaluative Feedback**: Evaluate the prior answer's completeness, medical vocabulary, and conceptual accuracy. Point out what was correct and what was missing.
          2. 💯 **Marks Awarded**: Give a score for this specific response (e.g. 7.5 out of 10), with brief marking rubric criteria.
          3. 🎯 **Model Answer**: Provide a textbook-grade, flawless answer to the previous question.
          4. 🔄 **The Next Challenge**: Present a logical, progressive follow-up question that builds on the previous concept to evaluate deep mastery.
        `;
      } else if (toolType === "answer-evaluator") {
        const { questionTitle, studentAnswer, examType } = payload;
        promptText = `
          You are an official academic examiner for BHMS Board Exams and AIAPGET rankings.
          
          Evaluate this student submission:
          - Question: "${questionTitle}"
          - Student's Answer Paper: "${studentAnswer}"
          - Target Exam Format: ${examType || "BHMS University Theory (Long Essay)"}
          
          Provide a highly detailed, rigid, educational review:
          1. 📈 **Marks Estimation**: Score out of 20 (for university theory) or predicted percentage.
          2. ❌ **Missing High-Yield Points**: Highlight key terms, drug provers, clinical keynotes, aphorisms, or relationships that were omitted but are essential for top marks.
          3. ✍️ **Formatting & Layout Enhancements**: Suggest how the student can use tables, anatomical flowcharts, or structured groupings to present the answer more cleanly.
          4. 🌟 **Revised Model Outline**: Present an ideal bullet-point structure that would secure 100% marks if written.
        `;
      } else if (toolType === "quiz-generator") {
        const { topic, difficulty, questionType } = payload;
        promptText = `
          Generate a high-yield clinical homeopathic quiz set of 5 questions.
          - Topic Area: ${topic || "Polychrest Remedies"}
          - Difficulty: ${difficulty || "AIAPGET Exam Level"}
          - Question Style: ${questionType || "Multiple Choice Questions (MCQ)"}
          
          Question styles can be standard MCQs, Match-the-Following, Assertion-Reason, or Clinical Case Riddles.
          
          For each question, your output MUST include:
          1. The Question statement clearly formulated according to standard NCH (National Commission for Homoeopathy) exam guidelines.
          2. For MCQs: 4 logical options (A, B, C, D).
          3. **The Correct Option**.
          4. **Exhaustive Explanation**: Detail why the correct option is true, why each incorrect option is false, and cite relevant literature (Organon, Kent, Allen Keynotes) where applicable.
        `;
      } else if (toolType === "study-planner") {
        const { weakSubjects, targetExam, weeklyHoursAvailable } = payload;
        promptText = `
          You are a premium academic coach for BHMS professional students and AIAPGET candidates.
          
          Build a highly customized personal study calendar:
          - Target Goal/Exam: ${targetExam || "AIAPGET Prep"}
          - Weak Subjects / Focus Areas: ${weakSubjects || "Miasms, Repertory mathematical formulas, Anatomy, Physiology"}
          - Study Budget: ${weeklyHoursAvailable || "20"} hours per week

          Structure the schedule as follows:
          1. 📅 **Weekly Split**: Distribute the hours across days, specifying dedicated subject slots (e.g. Organon vs Repertory vs Materia Medica).
          2. 🔄 **Revision & Active Recall Cycles**: Program space for spaced-repetition, quiz practice, and clinical case studies.
          3. 🎯 **Weak Area Interventions**: Propose exact memory strategies and specific book chapters to tackle the identified weak points.
          4. 📋 **Daily High-Yield Target Checklists**: Give a template of specific daily milestones for the first week.
        `;
      } else if (toolType === "mnemonic-generator") {
        const { conceptToMemorize, languagePreference } = payload;
        promptText = `
          Create a remarkable, fun, and mathematically high-retention homeopathic mnemonic.
          - Symptom/Remedy/Concept: "${conceptToMemorize}"
          - Language: ${languagePreference || "Hinglish (mix of Hindi & English)"}
          
          Provide:
          1. 🔑 **The Core Formula**: A clean, easily recallable acronym, word, or catchy rhyme.
          2. 📖 **Explanation Matrix**: Detail exactly what each letter or part represents clinically.
          3. 🏰 **Memory Palace Narrative**: Describe a short, vivid, multi-sensory mental story matching the remedy's symptoms to solidify long-term retention.
        `;
      } else if (toolType === "personality-decoder") {
        const { remedyName } = payload;
        promptText = `
          You are a master of homeopathic psycho-dynamics. Decode the remedy personality as a real-life contemporary archetype:
          - Remedy: **${remedyName}**
          
          Provide a highly vivid, engaging, and memorable study profile:
          1. 🎭 **The Real-Life Archetype Persona**: If this remedy walked into a modern coffee shop, how would they act, dress, talk, and behave? (Use creative, contemporary labels).
          2. 💔 **Inner Fears, Passions & Desires**: What are their underlying cognitive conflicts, core triggers, and psychological vulnerabilities?
          3. 🔄 **The Interpersonal dynamic**: How do they navigate relationships, stress, or professional failure?
          4. 🌟 **Classical Homoeopathic Equivalency**: Correlate these modern characters directly to the Materia Medica rubrics and keynotes from Kent or Vithoulkas.
        `;
      } else if (toolType === "story-generator") {
        const { remedyName, narrativeMood } = payload;
        promptText = `
          Convert the clinical picture of the homeopathic remedy: **${remedyName}** into an engaging, unforgettable educational story.
          - Narrative Mood: ${narrativeMood || "Adventure/Mythological"}

          Construct a beautiful allegorical narrative:
          1. 📖 **The Allegorical Narrative**: A story where the main character, their setting, their struggles, their triggers (e.g., getting cold, drinking warm milk), and subsequent healing mirror the exact keynotes and modalities of ${remedyName}.
          2. 🧩 **Rubric Translation Guild**: A key at the end of the story decrypting how each plot point correlates to real Materia Medica keynotes (e.g. "The locked room at midnight represents the 12 AM aggravation of Ars Alb").
        `;
      } else if (toolType === "clinical-mystery") {
        const { stage, previousDecisions } = payload;
        promptText = `
          You are the Dungeon Master for a "Homeopathic Clinical Mystery Challenge".
          - Active Game Stage: ${stage || "Stage 1 (Initial Clues)"}
          - Player's Previous Clinical Decisions: "${previousDecisions || "None"}"

          Design a localized patient mystery case:
          1. 🕵️‍♂️ **Stage Clues**: Reveal descriptive symptoms of a patient progressive starting from physical modalities, then mental keynotes, then chemical cravings.
          2. 📋 **Progressive Clues (Progress 20% to 100%)**: Supply active findings from diagnostic tests or miasmatic family records.
          3. 🏆 **Score Feedback**: Score their diagnosis or selection reasoning, or prompt them to guess the proper simillimum with multiple options if they are answering.
        `;
      } else if (toolType === "aiapget-coach") {
        const { scoresHistory, targetRank } = payload;
        promptText = `
          Analyze the student's mock-test performance parameters and create an AIAPGET Exam Advisory Program:
          - Mock Test Scores History: "${scoresHistory || "Averaging 65% with high errors in Repertory formulas and Pharmacy laws"}"
          - Target Rank Goal: ${targetRank || "Top 100 State Ranking"}

          Provide an advanced tactical briefing:
          1. 📊 **Symptom Performance Diagnostics**: Diagnose the core academic failure points, predicting whether they are related to timing, cramming, or conceptual gaps.
          2. 🎯 **The High-Yield Revision Blueprint**: Provide a tailored 14-day study sprint focusing heavily on high-yield and heavy-weight marks.
          3. 🔮 **Exam Readiness Indicator**: Give a percentage forecast of their likelihood of clear, with bulleted requirements to achieve their dream rank.
        `;
      } else if (toolType === "anatomy-tutor") {
        const { anatomyTopic } = payload;
        promptText = `
          You are an elite Anatomy Tutor for first-year BHMS (Bachelor of Homeopathic Medicine and Surgery) students.
          
          Topic: **${anatomyTopic}**
          
          Provide a comprehensive study guide:
          1. 📦 **Anatomical Summary**: High-yield structures, muscles, nerves, arterial supply, and clinical dissection points.
          2. 🗺️ **Textual ASCII/Markdown Drawing**: Create a visual ASCII text diagram that maps the key anatomical structures and relations.
          3. 💡 **Recall Mnemonics**: Unforgettable phrases to remember branches, relations, or insertion borders.
          4. 🎤 **Viva Prep Questions**: 3 common oral questions asked by the anatomy externally with ideal model responses.
          5. 📚 **Clinical Applied Anatomy**: Explain the surgical or clinical relevance of this structure to homeopathic diagnostics.
        `;
      } else if (toolType === "physiology-tutor") {
        const { mechanismTopic } = payload;
        promptText = `
          You are an elite Medical Physiology Tutor.
          
          Mechanism: **${mechanismTopic}**
          
          Formulate a pristine, step-by-step masterclass:
          1. 🔄 **Step-by-Step Pathway**: Break down the biochemistry / functional steps sequentially.
          2. 📊 **Markdown Flowchart Diagram**: Represent the cascade or loops in a clear, highly visual Markdown text-flow format.
          3. 🎓 **Exam-Oriented Board Notes**: A summarized study card tailored to standard medical university examinations.
          4. 🏆 **Homeopathic Correlation**: Explain how functional physiological imbalances in this system relate to Hahnemann's concept of vital force perturbation and disease manifestation.
        `;
      } else if (toolType === "organon-mentor") {
        const { queryTermOrAphorism } = payload;
        promptText = `
          You are an elite Organon of Medicine Mentor, interpreting Samuel Hahnemann's deep classical aphorisms for today's practitioners.
          
          Query / Aphorism: "${queryTermOrAphorism}"
          
          Synthesize an exhaustive guide:
          1. 📜 **The Core Aphorism Text**: State or summarize the relevant aphorisms in clear, dignified language.
          2. 🔍 **Historical Explanation & Context**: Explain why Hahnemann wrote this, the historical debate in 19th-century medicine, and the exact conceptual meaning of translation nuances.
          3. 🩺 **Direct Clinical Application**: Translate the philosophical doctrine into practical clinic instructions (e.g., how to recognize curative response, handle secondary action, or manage medicinal aggravations).
          4. 🎓 **Exam Viva Masterpoints**: Cheat-sheet indicators for passing Organon theory board questions.
        `;
      } else if (toolType === "research-assistant") {
        const { paperTopicOrAbstract } = payload;
        promptText = `
          You are a Homeopathic Clinical Research Assistant.
          
          Topic / Research Material: "${paperTopicOrAbstract}"
          
          Provide an objective, clinical research synthesis:
          1. 📝 **Methodology & Key Finding Summaries**: Extract key insights, molecular biomarker pathways, randomized controlled results, or in-vitro study designs.
          2. 📊 **Therapeutic Evidence Standing**: Critically evaluate the quality of research (clinical trials, pilot trials, retro studies) and identify biases.
          3. 📖 **Harvard/APA Citation Generator**: Build a complete, ready-to-copy academic reference.
        `;
      } else if (toolType === "daily-learning-coach") {
        promptText = `
          You are the Daily Homeopathy Learning Coach. Synthesize a pristine, comprehensive "Daily Learning Cocktail" of clinical wisdom:
          
          1. 💊 **Daily Remedy Spotlight**: A focused, high-yield overview of one key classical remedy (e.g. Bryonia, Silicea), including its signature keynote modality and clinical essence.
          2. 📖 **Daily Repertory Rubric**: Introduce an intriguing rubric, detailing its chapter hierarchy and unique graduation weights.
          3. 🧠 **Daily Mini-Mnemonic**: A highly creative trace mnemonic for a common symptom.
          4. 🔍 **Daily Clinical Pearl**: An expert prescribing tip regarding potency management or clinical observation.
          5. 🏆 **Daily Clinical Question**: Formulate 1 quick challenging AIAPGET multichoice quiz question along with correct answer and brief rationale.
        `;
      } else if (toolType === "voice-repertorizer") {
        const { transcriptText } = payload;
        promptText = `
          Parse the spoken clinical transcript symptoms: "${transcriptText}"
          
          Act as a professional Voice Repertorizer:
          1. 🎙️ **Vocal Keyword Extraction**: Isolate characteristic symptom modifiers, thermal keys, or localized parts.
          2. 📊 **Repertory Rubrics Output**: Translate them into formal Kent or Boericke repertory rubrics with graduation weights (+3, +2, +1).
          3. 💊 **High-Sensitivity Remedies**: Recommend the top matching medicines and explain how to probe further into the patient's vocal modalities.
        `;
      } else if (toolType === "remedy-battle") {
        const { fighterA, fighterB } = payload;
        promptText = `
          Welcome to the "Homeopathic Remedy Battle Arena"! You are the academic coordinate-announcer analyzing an epic, gamified competitive showdown:
          - Fighter A (Remedy): **${fighterA}**
          - Fighter B (Remedy): **${fighterB}**
          
          Analyze this matchup in an extremely creative, visual RPG/Battle format that is highly educational:
          1. 📊 **Attributes Comparison Grid**: Compare health points, speed of action, thermal defense modifiers, thirst meters, and mental mood weapons.
          2. ⚔️ **The Duel Commentary**: Describe a fictional clash of these remedy profiles. For example, how Fighter A's chilly, slow-onset defense reacts when matched against Fighter B's hot, sudden-onset attack pattern. Make this duel directly mirror their actual clinical keynotes!
          3. 🏆 **Winner Matrix**: Explain which clinical presentation or conditions would make one "defeat" or override the other during patient prescribing.
        `;
      } else if (toolType === "guess-remedy") {
        const { score, level } = payload;
        promptText = `
          Generate an interactive interactive "Guess the Remedy" riddle.
          - Current Player Score: ${score || 0}
          - Target Level: ${level || "Classic Polychrest"}
          
          Structure the challenge:
          1. 🧩 **The Mysterious Keynote Riddle**: 4 progressive, cryptic yet medically accurate keynote clues, moving from abstract and rare to obvious.
          2. 💡 **Clinical Modality Hints**: Supply specific, unique thermal reactions or cravings as supplementary clues.
          3. 🗳️ **Options List**: Present 4 candidate remedies (A, B, C, D) for the player to select from.
          4. 🔑 **The Revealed Truth**: (Hidden at the bottom for verification feedback) Provide the correct answer, the prover's history, and high-yield study notes.
        `;
      } else if (toolType === "flashcard-generator") {
        const { topicName } = payload;
        promptText = `
          You are an expert Study Tool developer. Instantly compile a print-ready set of 4 classic revision flashcards for:
          - Topic Name: **${topicName}**
          
          Render each card in a beautiful, structured Markdown ASCII box with a "Front Side" and a "Back Side":
          - **Card Front**: Concise concept, symptom, or remedy synonym.
          - **Card Back**: Detailed keynotes, modalities, active provers, or anatomical/physiological relations.
        `;
      } else if (toolType === "case-simulation") {
        const { clinicalRank } = payload;
        promptText = `
          We are in the Homeopathic Clinical Case Simulation Lab.
          Generate a realistic clinical practice patient case at the **${clinicalRank || "Junior Resident"}** level:
          
          Include:
          1. 👤 **Patient Demographics & Presentation**: Age, occupation, onset history.
          2. 💬 **Subjective Dialog Lines**: Direct quotes from the patient describing their physical modalities, emotional triggers, dreams, thermal states, and general sleep.
          3. 🩺 **Objective Findings**: Clinical observation of skin, pulse, structural elements, and medical diagnostic parameters.
          4. 📜 **Miasmatic Family History**: Genetic predispositions.
          5. 🗳️ **Simulation Challenge Prompts**: Challenge the student with 3 critical decision questions about mapping rubrics, ruling out counter indications, and prescribing.
        `;
      } else {
        return res.status(400).json({ error: "Invalid toolType" });
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptText,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.1, // low temperature for extreme consistency and professional precision
        }
      });

      const rawText = response?.text || "";
      const textWithLinks = rawText ? appendReferenceLinks(rawText, promptText + " " + JSON.stringify(payload || {})) : "No response received from clinical AI engine.";
      res.json({ text: textWithLinks });
    } catch (error: any) {
      console.error("Gemini Professional Tool Proxy Error:", error);
      res.status(500).json({ error: error.message || "Failed to process professional tool request" });
    }
  });

  // API Routes
  app.get("/api/posts", (req, res) => {
    const { category, search, tag } = req.query;
    let filtered = [...postsDb];

    if (category && category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (search) {
      const searchStr = (search as string).toLowerCase();
      filtered = filtered.filter(p => 
        (p.title && p.title.toLowerCase().includes(searchStr)) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(searchStr)) ||
        (p.content && p.content.toLowerCase().includes(searchStr))
      );
    }

    if (tag) {
      const tagStr = (tag as string).toLowerCase();
      filtered = filtered.filter(p => 
        p.tags && p.tags.some((t: string) => t.toLowerCase() === tagStr)
      );
    }

    res.json(filtered);
  });

  app.get("/api/posts/slug/:slug", (req, res) => {
    try {
      const slugParam = req.params.slug;
      console.log(`[API] Fetching post by slug: ${slugParam}`);
      let post = postsDb.find(p => p.slug === slugParam);
      
      // Fallback to checking by ID if slug doesn't match
      if (!post) {
        post = postsDb.find(p => p.id === slugParam);
      }

      if (post) {
        res.json(post);
      } else {
        console.warn(`[API] Post not found for slug or id: ${slugParam}`);
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      console.error(`[API] Error fetching post by slug: ${req.params.slug}`, error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.get("/api/posts/:id", (req, res) => {
    try {
      const post = postsDb.find(p => p.id === req.params.id);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
