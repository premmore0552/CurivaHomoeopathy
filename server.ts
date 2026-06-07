import express from "express";
import { createServer as createViteServer } from "vite";
import { allBlogPosts } from "./src/data/blogPosts";
import path from "path";
import { fileURLToPath } from "url";
import Razorpay from "razorpay";
import crypto from "crypto";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const PORT = 3000;

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

  app.post("/api/gemini/search", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ error: "Query is required" });
      }
      
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
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
        model: "gemini-3.5-flash",
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
        model: "gemini-3.5-flash",
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
        model: "gemini-3.5-flash",
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
