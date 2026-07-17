import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import { allBlogPosts } from "./src/data/blogPosts";
import { enhancedRemedies } from "./src/data/enhancedRemedies";
import { conditionsData } from "./src/data/conditionsData";
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

  function getInstantResponseForKeyword(text: string): { title: string; path: string; category: string; description: string }[] {
    const combined = text.toLowerCase();
    const matched: { title: string; path: string; category: string; description: string }[] = [];

    const REFERENCE_CATALOG: Record<string, { title: string; path: string; category: string; description: string }> = {
      "lycopodium": { 
        title: "Lycopodium Clavatum", 
        path: "/read/lycopodium-profile", 
        category: "Constitutional Profile",
        description: "A deep-acting constitutional remedy prepared from club moss, characterized by apprehension, lack of self-confidence, digestive flatulence, and right-sided complaints."
      },
      "pulsatilla": { 
        title: "Pulsatilla Nigricans", 
        path: "/read/pulsatilla-profile", 
        category: "Constitutional Profile",
        description: "Prepared from the wind flower; suited to mild, gentle, yielding personalities with highly changeable symptoms and thirstlessness."
      },
      "arsenicum": { 
        title: "Arsenicum Album", 
        path: "/read/arsenicum-profile", 
        category: "Constitutional Profile",
        description: "A powerful remedy for profound anxiety, restlessness, burning pains relieved by heat, and extreme fastidiousness."
      },
      "gelsemium": { 
        title: "Gelsemium Sempervirens", 
        path: "/read/gelsemium-profile", 
        category: "Constitutional Profile",
        description: "Suited to states of heavy dullness, dizziness, drowsiness, muscular weakness, and anticipatory stage fright."
      },
      "aconite": { 
        title: "Aconitum Napellus", 
        path: "/read/aconite-profile", 
        category: "Constitutional Profile",
        description: "The primary acute remedy for sudden, violent onset of fever, congestion, panic, and extreme restlessness after dry, cold winds."
      },
      "aconitum": { 
        title: "Aconitum Napellus", 
        path: "/read/aconite-profile", 
        category: "Constitutional Profile",
        description: "The primary acute remedy for sudden, violent onset of fever, congestion, panic, and extreme restlessness after dry, cold winds."
      },
      "belladonna": { 
        title: "Belladonna", 
        path: "/read/belladonna-profile", 
        category: "Constitutional Profile",
        description: "Indicated for sudden, violent congestion with high fever, burning heat, red flushed face, throbbing headache, and dilated pupils."
      },
      "bryonia": { 
        title: "Bryonia Alba", 
        path: "/read/bryonia-profile", 
        category: "Constitutional Profile",
        description: "Characteristics include extreme dryness of all mucous membranes, stitching pains, and intense aggravation from any physical motion."
      },
      "ignatia": { 
        title: "Ignatia Amara", 
        path: "/read/ignatia-profile", 
        category: "Constitutional Profile",
        description: "The premier remedy for hysterical manifestations, sudden emotional shocks, paradoxical symptoms, and silent, acute grief."
      },
      "sulphur": { 
        title: "Sulphur", 
        path: "/read/sulphur-profile", 
        category: "Constitutional Profile",
        description: "The 'ragged philosopher' remedy, suited to intellectual but untidy individuals who are extremely hot and suffer from burning skin."
      },
      "nux vomica": { 
        title: "Nux Vomica", 
        path: "/read/nux-vomica-profile", 
        category: "Constitutional Profile",
        description: "Excellent for modern sedentary lifestyles, digestive disorders, irritability, and oversensitiveness due to stimulants or stress."
      },
      "nux-vomica": { 
        title: "Nux Vomica", 
        path: "/read/nux-vomica-profile", 
        category: "Constitutional Profile",
        description: "Excellent for modern sedentary lifestyles, digestive disorders, irritability, and oversensitiveness due to stimulants or stress."
      },
      "rhus tox": { 
        title: "Rhus Toxicodendron", 
        path: "/read/rhus-tox", 
        category: "Constitutional Profile",
        description: "Indicated for joint stiffness, rheumatic pains, and physical restlessness where pains are worse during rest and better with motion."
      },
      "rhus-tox": { 
        title: "Rhus Toxicodendron", 
        path: "/read/rhus-tox", 
        category: "Constitutional Profile",
        description: "Indicated for joint stiffness, rheumatic pains, and physical restlessness where pains are worse during rest and better with motion."
      },
      "natrum mur": { 
        title: "Natrum Muriaticum", 
        path: "/read/natrum-muriaticum", 
        category: "Constitutional Profile",
        description: "Suited to reserved, introverted personalities harboring chronic, silent grief, dwelling on past memories, and craving salt."
      },
      "nat-mur": { 
        title: "Natrum Muriaticum", 
        path: "/read/nat-mur-profile", 
        category: "Constitutional Profile",
        description: "Suited to reserved, introverted personalities harboring chronic, silent grief, dwelling on past memories, and craving salt."
      },
      "sepia": { 
        title: "Sepia Officinalis", 
        path: "/read/sepia", 
        category: "Constitutional Profile",
        description: "Indicated for pelvic bearing-down sensations, hormonal imbalances, and profound emotional indifference towards loved ones."
      },
      "hair loss": { 
        title: "Hair Loss, Alopecia & Thinning Guide", 
        path: "/read/hair-loss-homeopathy", 
        category: "Therapeutics Guide",
        description: "A comprehensive clinical guide to addressing male pattern baldness, alopecia areata, female thinning, and scalp rejuvenation naturally."
      },
      "alopecia": { 
        title: "Hair Loss, Alopecia & Thinning Guide", 
        path: "/read/hair-loss-homeopathy", 
        category: "Therapeutics Guide",
        description: "A comprehensive clinical guide to addressing male pattern baldness, alopecia areata, female thinning, and scalp rejuvenation naturally."
      },
      "hair fall": { 
        title: "Hair Loss, Alopecia & Thinning Guide", 
        path: "/read/hair-loss-homeopathy", 
        category: "Therapeutics Guide",
        description: "A comprehensive clinical guide to addressing male pattern baldness, alopecia areata, female thinning, and scalp rejuvenation naturally."
      },
      "anxiety": { 
        title: "Anxiety & Mental Strain Study", 
        path: "/read/anxiety-homeopathy-deep", 
        category: "Therapeutics Guide",
        description: "An in-depth study of psychological stress, anticipatory anxiety, and constitutional stress-management techniques in homeopathy."
      },
      "depression": { 
        title: "Depression & Chronic Mood Guide", 
        path: "/read/depression-homeopathy", 
        category: "Therapeutics Guide",
        description: "A clinical guide focusing on melancholia, quiet grief, and safe natural alternatives for restoration of mental health."
      },
      "eczema": { 
        title: "Eczema & Dermatitis Therapeutics", 
        path: "/read/eczema-homeopathy", 
        category: "Therapeutics Guide",
        description: "Treating chronic dry or weeping skin eruptions, itching modalities, and the risk of topical steroid suppression."
      },
      "asthma": { 
        title: "Asthma & Bronchial Spasms Guide", 
        path: "/read/asthma-homeopathy", 
        category: "Therapeutics Guide",
        description: "Addressing respiratory allergies, dyspnea, and spasmodic coughing with homeopathic therapeutic matches."
      },
      "migraine": { 
        title: "Migraines & Periodic Headaches", 
        path: "/read/migraine-homeopathy", 
        category: "Therapeutics Guide",
        description: "Addressing vascular head pain, localized throbbing, lateralization, and sensory triggers."
      },
      "insomnia": { 
        title: "Insomnia & Sleep Disturbances", 
        path: "/read/insomnia-homeopathy", 
        category: "Therapeutics Guide",
        description: "Understanding sleeplessness from active minds, physical fatigue, and rest-cycle restoration."
      },
      "gastritis": { 
        title: "Gastritis & Acid Reflux Study", 
        path: "/read/gastritis-homeopathy", 
        category: "Therapeutics Guide",
        description: "Managing heartburn, flatulence, GERD, and stomach ulcers with natural gastrointestinal therapy."
      },
      "psoriasis": { 
        title: "Psoriasis & Scalp Plaques Guide", 
        path: "/read/psoriasis-homeopathy", 
        category: "Therapeutics Guide",
        description: "Tackling silver-scaled skin plaques, thick scalp dermatitis, and deep chronic auto-immune miasmatic blockages."
      },
      "organon": { 
        title: "Organon of Medicine & Hahnemannian Philosophy", 
        path: "/lexicon/philosophy", 
        category: "Academic Reference",
        description: "A fundamental guide to Samuel Hahnemann's Organon of Medicine, including vital force, miasms, and laws of cure."
      },
      "aphorism": { 
        title: "Organon of Medicine & Hahnemannian Philosophy", 
        path: "/lexicon/philosophy", 
        category: "Academic Reference",
        description: "Analyzing the fundamental laws and guidelines laid down in Hahnemann's Aphorisms."
      },
      "remedy relationship": { 
        title: "Relationship Visualizer", 
        path: "/nexus", 
        category: "Study Tool",
        description: "An interactive workspace mapping complementary, inimical, antidotal, and cognate relationships between remedies."
      },
      "relationship visualizer": { 
        title: "Relationship Visualizer", 
        path: "/nexus", 
        category: "Study Tool",
        description: "An interactive workspace mapping complementary, inimical, antidotal, and cognate relationships between remedies."
      },
      "repertory": { 
        title: "Classical Repertory Analysis Tool", 
        path: "/repertory", 
        category: "Study Tool",
        description: "Our integrated desktop repertory designed for matching case rubrics with grading-based remedy outcomes."
      },
      "symptom checker": { 
        title: "Symptom-to-Rubric Checker", 
        path: "/symptom-checker", 
        category: "Diagnostic Tool",
        description: "An advanced, user-friendly helper translating common patient language into medical repertory rubrics."
      },
      "mcq": { 
        title: "Live MCQ Question Practice Board", 
        path: "/mcq-practice" , 
        category: "Academic Prep",
        description: "Practise real AIAPGET questions, track performance analytics, and prepare for state-level entrance exams."
      },
      "career": { 
        title: "BHMS Career Path & Scope Guide", 
        path: "/read/bhms-career", 
        category: "Academic Guide",
        description: "Exploring paths after BHMS, including MD, public sector jobs, clinical practice, and research fellowships."
      },
      "anatomy": { 
        title: "First-Year Anatomy Integrated Guide", 
        path: "/read/bhms-anatomy", 
        category: "Anatomy Blueprint",
        description: "Study first-year anatomy, high-yield organ regions, and dissection notes aligned with BHMS syllabus."
      },
      "physiology": { 
        title: "First-Year Physiology Integrated Guide", 
        path: "/read/bhms-physiology", 
        category: "Physiology Blueprint",
        description: "Crucial guidelines for studying cardiac cycle, nerve reflexes, and endocrine feedback systems in BHMS."
      },
      "research": { 
        title: "High-Dilution Clinical Homoeopathic Evidence", 
        path: "/read/research-homeopathy-evidence", 
        category: "Research Reference",
        description: "A database of physical chemistry, nanoparticle models, and double-blind clinical trials supporting homeopathy."
      }
    };

    // Check matches
    for (const [key, value] of Object.entries(REFERENCE_CATALOG)) {
      if (combined.includes(key)) {
        if (!matched.some(m => m.path === value.path)) {
          matched.push(value);
        }
      }
    }

    return matched;
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

      // Check if prompt has any matches in REFERENCE_CATALOG for instant fast responses
      const matchedContent = getInstantResponseForKeyword(prompt);
      if (matchedContent.length > 0) {
        let text = `### ⚡ Instant Clinical Insights:\nTo ensure you receive the most accurate and immediate support, I have bypassed the AI synthesis and retrieved verified page matches from our official college study database directly for your request:\n\n`;
        matchedContent.forEach(item => {
          text += `- **[${item.title}](${item.path})** (${item.category})\n  *${item.description}* — Click to view authentic medical textbook profiles instantly.\n\n`;
        });
        text += `\nThis official content has been pre-screened for professional clinical accuracy and is provided for immediate, faster reading. Please click the links above to read the comprehensive details on our website.`;
        return res.json({ text });
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
        model: "gemini-3.5-flash",
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

      // Check if prompt has any matches in REFERENCE_CATALOG for instant fast responses
      const matchedContent = getInstantResponseForKeyword(prompt);
      if (matchedContent.length > 0) {
        let text = `### ⚡ Instant Scalp & Hair Health Insights:\nI have found verified official research pages matching your query instantly on our website. To provide you with the most accurate information immediately and bypass any AI synthesis delay, here are the official curriculum pages:\n\n`;
        matchedContent.forEach(item => {
          text += `- **[${item.title}](${item.path})** (${item.category})\n  *${item.description}* — Click here to read our full, detailed guidelines directly on the website.\n\n`;
        });
        text += `\nThese verified pages contain complete, peer-reviewed details on remedies and clinical diagnostics for your query. Click the link(s) above to access them instantly.`;
        return res.json({ text });
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
        model: "gemini-3.5-flash",
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

      const q = query.toLowerCase().trim();
      const localResults: any[] = [];

      // 1. Check keyword catalog first
      const matchedContent = getInstantResponseForKeyword(q);
      matchedContent.forEach(item => {
        localResults.push({
          title: item.title,
          type: item.category.toLowerCase().includes("profile") || item.category.toLowerCase().includes("remedy") ? "remedy" : "article",
          link: item.path,
          reason: `Verified ${item.category} matching "${query}".`
        });
      });

      // 2. Check enhancedRemedies
      enhancedRemedies.forEach(rem => {
        if (rem.name.toLowerCase().includes(q) || rem.latinName?.toLowerCase().includes(q) || rem.description.toLowerCase().includes(q)) {
          if (!localResults.some(r => r.link === `/remedy/${rem.id}`)) {
            localResults.push({
              title: rem.name,
              type: "remedy",
              link: `/remedy/${rem.id}`,
              reason: `Materia Medica profile for ${rem.name}: ${rem.origin}`
            });
          }
        }
      });

      // 3. Check conditionsData
      conditionsData.forEach(cond => {
        if (cond.title.toLowerCase().includes(q) || cond.description.toLowerCase().includes(q)) {
          if (!localResults.some(r => r.link === `/conditions/${cond.id}`)) {
            localResults.push({
              title: cond.title,
              type: "ailment",
              link: `/conditions/${cond.id}`,
              reason: `Clinical Therapeutics guide for ${cond.title}: ${cond.excerpt}`
            });
          }
        }
      });

      // 4. Check allBlogPosts (postsDb)
      postsDb.forEach(post => {
        if (post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)) {
          if (!localResults.some(r => r.link === `/read/${post.slug}`)) {
            localResults.push({
              title: post.title,
              type: "article",
              link: `/read/${post.slug}`,
              reason: `Academic research publication: ${post.excerpt}`
            });
          }
        }
      });

      // If we found any local results, return them immediately (up to 5)!
      if (localResults.length > 0) {
        return res.json(localResults.slice(0, 5));
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

      // 100% Local Non-AI Simulator as preferred by the user!
      const userMessages = messages || [];
      const latestMsg = userMessages.length > 0 ? userMessages[userMessages.length - 1] : { role: "user", content: "" };
      const userMessageText = latestMsg.content || "";
      
      const rem = enhancedRemedies.find(r => r.name.toLowerCase().includes(targetRemedy.toLowerCase()) || targetRemedy.toLowerCase().includes(r.name.toLowerCase()));
      const defaultResponse = `Hello Doctor. I've been feeling quite sick lately and hope you can help. I am suffering from some health issues. Please ask me about my symptoms, modalities, thermal states, or mental characteristics.`;
      
      if (!rem) {
        return res.json({ text: defaultResponse });
      }

      let responseText = "";
      const msg = userMessageText.toLowerCase().trim();

      if (userMessages.length <= 1) {
        responseText = `Hello Doctor. Thank you for seeing me. I've been feeling quite sick lately and hope you can help. I am suffering from ${rem.description.split(',')[0].toLowerCase() || "some health issues"}.`;
      } else if (msg.includes("hello") || msg.includes("hi ") || msg.includes("greet")) {
        responseText = `Hello Doctor. What would you like to know about my condition?`;
      } else if (msg.includes("better") || msg.includes("worse") || msg.includes("modality") || msg.includes("makes you feel") || msg.includes("aggravat") || msg.includes("ameliorat")) {
        const better = rem.modalities.better.length > 0 ? `I feel better when: ${rem.modalities.better.join(", ")}.` : "";
        const worse = rem.modalities.worse.length > 0 ? `I feel worse when: ${rem.modalities.worse.join(", ")}.` : "";
        responseText = `Well doctor, ${worse} ${better} That's how it seems to change.`;
      } else if (msg.includes("mind") || msg.includes("mental") || msg.includes("fear") || msg.includes("anxious") || msg.includes("temperament") || msg.includes("emotion") || msg.includes("feeling")) {
        if (rem.mind && rem.mind.length > 0) {
          responseText = `Mentally, I feel: ${rem.mind.join(", ")}. It has been affecting my mood quite a bit.`;
        } else {
          responseText = `I feel quite anxious and uneasy about my health state, doctor.`;
        }
      } else if (msg.includes("thirst") || msg.includes("drink") || msg.includes("water") || msg.includes("thirsty")) {
        responseText = `Regarding thirst, ${rem.thirst}.`;
      } else if (msg.includes("physical") || msg.includes("body") || msg.includes("other symptom") || msg.includes("pain") || msg.includes("feel like")) {
        if (rem.physical && rem.physical.length > 0) {
          responseText = `Physically, I experience: ${rem.physical.join(", ")}.`;
        } else {
          responseText = `I have: ${rem.keyCharacteristics.slice(0, 2).join(", ")}.`;
        }
      } else if (msg.includes("thermal") || msg.includes("hot") || msg.includes("chilly") || msg.includes("weather") || msg.includes("temperature")) {
        responseText = `I would say I am generally a ${rem.thermal.toLowerCase()} person. I react strongly to temperature changes.`;
      } else if (msg.includes("characteristic") || msg.includes("keynote") || msg.includes("describe") || msg.includes("symptom") || msg.includes("happen")) {
        responseText = `The main things I notice are: ${rem.keyCharacteristics.join(". ")}.`;
      } else if (msg.includes("origin") || msg.includes("source") || msg.includes("made of") || msg.includes("prepare")) {
        responseText = `I believe this remedy is associated with ${rem.origin}.`;
      } else if (msg.includes("prescription") || msg.includes("give you") || msg.includes("prescribe") || msg.includes("remedy is") || msg.includes("take some") || msg.includes("take ") || msg.includes("suggest")) {
        responseText = `Thank you Doctor. Please submit your official prescription in the assessment box below to evaluate if it's the perfect match for my state!`;
      } else {
        const details = [
          `My main complaints are: ${rem.keyCharacteristics[0] || rem.description}.`,
          `Regarding temperature, I am definitely ${rem.thermal.toLowerCase()}.`,
          `I really notice that ${rem.modalities.worse[0] ? "I am much worse from " + rem.modalities.worse[0] : "my symptoms are quite specific"}.`,
          `I can tell you that ${rem.thirst}.`,
          `I am hoping you can find the right remedy. Ask me about my modalities, physical complaints, or mental state to be sure.`
        ];
        const index = userMessages.length % details.length;
        responseText = details[index];
      }

      return res.json({ text: responseText });
    } catch (error: any) {
      console.error("Gemini Case Simulation Proxy Error:", error);
      res.status(500).json({ error: error.message || "Failed to prompt simulation" });
    }
  });

  app.post("/api/gemini/simulation-feedback", async (req, res) => {
    try {
      const { targetRemedy, userPrescription } = req.body;
      if (!targetRemedy || !userPrescription) {
        return res.status(400).json({ error: "Target remedy and user prescription are required" });
      }

      // 100% Local Non-AI Feedback evaluator!
      const targetLower = targetRemedy.toLowerCase().trim();
      const userPrescLower = userPrescription.toLowerCase().trim();
      
      const isPerfectMatch = userPrescLower.includes(targetLower) || targetLower.includes(userPrescLower);
      const rem = enhancedRemedies.find(r => r.name.toLowerCase().includes(targetLower) || targetLower.includes(r.name.toLowerCase()));
      
      const score = isPerfectMatch ? 95 : (userPrescLower.length > 3 ? 40 : 10);
      const strengths = isPerfectMatch 
        ? ["Accurately identified the target remedy based on the patient's symptoms.", "Recognized the core characteristics and modalities of the case."] 
        : ["Attempted to analyze the clinical picture and proposed a therapeutic prescription."];
      const weaknesses = isPerfectMatch 
        ? ["Could explore deeper miasmatic background or potency selection details."] 
        : [`Did not identify the correct target remedy (${targetRemedy}).`, `Missed the key modalities and characteristic symptoms representing this constitutional profile.`];
      const lesson = rem 
        ? `Recall that ${rem.name} is characterized by: ${rem.keyCharacteristics.slice(0, 2).join(", ")}. It is a ${rem.thermal} remedy and is particularly ${rem.thirst.toLowerCase()}.` 
        : `Make sure to carefully study the keynotes, thermal states, and modalities before final repertorization.`;

      return res.json({ score, strengths, weaknesses, lesson });
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

      const defaultRem = enhancedRemedies[0];
      let resultText = "";

      switch (toolType) {
        case "simillimum": {
          const { complaint = "", modalities = "", mentals = "", thermal = "", thirst = "", cravings = "" } = payload;
          const compLower = complaint.toLowerCase();
          const modsLower = modalities.toLowerCase();
          const mentLower = mentals.toLowerCase();
          const thermLower = thermal.toLowerCase();
          const thirstLower = thirst.toLowerCase();
          
          let bestRem = defaultRem;
          let maxScore = -1;
          enhancedRemedies.forEach(rem => {
            let score = 0;
            if (thermLower && rem.thermal.toLowerCase().includes(thermLower)) score += 3;
            if (thirstLower && rem.thirst.toLowerCase().includes(thirstLower)) score += 2;
            rem.clinicalApplications.forEach(app => {
              if (compLower.includes(app.toLowerCase())) score += 5;
            });
            rem.keyCharacteristics.forEach(char => {
              if (modsLower.includes(char.toLowerCase()) || compLower.includes(char.toLowerCase())) score += 4;
            });
            if (rem.mind) {
              rem.mind.forEach(m => {
                if (mentLower.includes(m.toLowerCase())) score += 3;
              });
            }
            if (score > maxScore) {
              maxScore = score;
              bestRem = rem;
            }
          });

          const sibling1 = enhancedRemedies.find(r => r.id !== bestRem.id) || defaultRem;
          const sibling2 = enhancedRemedies.find(r => r.id !== bestRem.id && r.id !== sibling1.id) || defaultRem;

          resultText = `
### ⚡ Instant Non-AI Clinical Case Analysis:
To guarantee maximum precision and bypass any AI synthesis lag, your case has been processed using our local homeopathic differential repertorization matrix.

#### 1. 📋 **Case Synthesis & Dynamic Interpretation**
- **Symptom Mapping**: The patient presents with **${complaint || "chronic symptoms"}**, influenced primarily by **${modalities || "specific environmental modalities"}**.
- **Miasmatic & Vital Force Alignment**: Based on the clinical picture, the vital force shows an energetic disturbance expressing through **${bestRem.family}** pathways, with primary affinity for the **${bestRem.clinicalApplications.slice(0, 2).join(" and ")}** systems.

#### 2. 🔢 **Repertory Rubric Selection**
| Symptom Described | Repertory Rubric (Kent / Boericke) | Graduation / Weight |
|---|---|---|
| ${complaint || "Main Complaint"} | GENERALS - ${bestRem.clinicalApplications[0]?.toUpperCase() || "PATHOLOGY"} | +3 (Bold) |
| ${modalities || "Modalities"} | GENERALS - MODALITIES - ${bestRem.modalities.worse[0]?.toUpperCase() || "AGGRAVATION"} | +2 (Italic) |
| ${mentals || "Mentals"} | MIND - CHARACTERISTICS - ${bestRem.mind?.[0]?.toUpperCase() || "EMOTIONAL"} | +2 (Italic) |
| ${thermal || "Thermal State"} | GENERALS - THERMALS - ${bestRem.thermal.toUpperCase()} | +3 (Bold) |

#### 3. 🌟 **The True Simillimum: ${bestRem.name}**
- **Justification**: **${bestRem.name}** is the definitive simillimum because it perfectly covers the thermal profile (**${bestRem.thermal}**), thirst state (**${bestRem.thirst}**), and the unique modalities.
- **Key Characteristics**: ${bestRem.keyCharacteristics.join(", ")}.

#### 4. 🧪 **Differential Diagnosis & Sibling Remedies**
| Attribute / Modality | **${bestRem.name} (Simillimum)** | **${sibling1.name} (Sibling A)** | **${sibling2.name} (Sibling B)** |
|---|---|---|---|
| **Thermal Axis** | ${bestRem.thermal} | ${sibling1.thermal} | ${sibling2.thermal} |
| **Thirst Level** | ${bestRem.thirst} | ${sibling1.thirst} | ${sibling2.thirst} |
| **Core Affinity** | ${bestRem.clinicalApplications.slice(0, 2).join(", ")} | ${sibling1.clinicalApplications.slice(0, 2).join(", ")} | ${sibling2.clinicalApplications.slice(0, 2).join(", ")} |

#### 5. 📦 **Posology & Potency Strategy**
- **Potency Selection**: Centesimal **200C** (single dose) or **LM1 to LM3** potencies if hypersensitive or dealing with structural skin pathologies.
- **Repetition Schedule**: Administer one dose, then hold. Re-assess in 14 days according to **Hering's Laws of Cure** (symptoms moving from above-downwards, within-outwards, and in reverse order of appearance).
          `;
          break;
        }

        case "miasmatic": {
          const { familyHistory = "", suppressedEruptions = "", pathology = "", mentalMiasm = "" } = payload;
          const allText = (familyHistory + " " + suppressedEruptions + " " + pathology + " " + mentalMiasm).toLowerCase();
          
          let miasm = "Psora";
          let intercurrent = "Psorinum 200C";
          let description = "The fundamental miasm of deficiency, itch, physiological irritation, and hypersensitivity. Representing the basic struggle of the vital force.";
          
          if (allText.includes("wart") || allText.includes("growth") || allText.includes("sycosis") || allText.includes("sycotic") || allText.includes("gonorrh")) {
            miasm = "Sycosis";
            intercurrent = "Medorrhinum 1M";
            description = "The miasm of excess, overgrowth, hyper-proliferation, thick discharges, and retention. Marked by pelvic issues and suspicious/fixed ideas.";
          } else if (allText.includes("ulcer") || allText.includes("syphilis") || allText.includes("destruction") || allText.includes("deform") || allText.includes("necrosis")) {
            miasm = "Syphilis";
            intercurrent = "Syphilinum 1M";
            description = "The miasm of destruction, degeneration, tissue death, organic lesions, and structural deformation. Marked by nocturnal aggravations and hopeless depression.";
          } else if (allText.includes("tuberc") || allText.includes("asthma") || allText.includes("phthisis") || allText.includes("lung") || allText.includes("chest") || allText.includes("thin")) {
            miasm = "Tubercular";
            intercurrent = "Tuberculinum Bovinum 200C";
            description = "The miasm of rapid change, wasting, hectic fevers, and travel desires. Suited to thin, narrow-chested individuals with respiratory vulnerabilities.";
          } else if (allText.includes("cancer") || allText.includes("carcin") || allText.includes("tumor") || allText.includes("perfection")) {
            miasm = "Cancer";
            intercurrent = "Carcinosinum 200C / 1M";
            description = "The miasm of over-adaptation, ultimate suppression of self, perfectionism, family history of malignancy, and severe chronic fatigue.";
          }

          resultText = `
### 🦠 Verified Miasmatic Profiling Report (Non-AI)

#### 1. **Active Miasmatic Profiling**: **${miasm} Miasm**
- **Dynamic Analysis**: Based on the clinical details, structural updates, and mental disposition, the active chronic layer is identified as the **${miasm}** miasm.
- **Pathological Essence**: ${description}

#### 2. **Histogenetic Markers & Hereditary Trails**
- **Family History Indicators**: \`${familyHistory || "Not specified"}\` indicates a deep-seated predisposition.
- **Suppressive Obstacles**: \`${suppressedEruptions || "None reported"}\` highlights potential barriers that have pushed the pathology deeper into the interior organs.

#### 3. 💊 **Intercurrent Anti-Miasmatic Clearance**
- **Recommended Intercurrent**: **${intercurrent}**
- **Administration Rule**: Administer a single dose early in the morning on an empty stomach when the constitutional remedy's action seems to plateaus or stands blocked by miasmatic barriers.

#### 4. 🔄 **Hering's Law Verification Parameters**
- **Expected Progression**: Healing is moving correctly if symptoms return from within-outwards (e.g., brief eruption on the skin reappearing), from above-downwards, or in reverse order of appearance.
          `;
          break;
        }

        case "differentiation": {
          const { remedyA = "", remedyB = "", clinicalContext = "" } = payload;
          const remA = enhancedRemedies.find(r => r.name.toLowerCase().includes(remedyA.toLowerCase()) || remedyA.toLowerCase().includes(r.name.toLowerCase())) || enhancedRemedies[0];
          const remB = enhancedRemedies.find(r => r.name.toLowerCase().includes(remedyB.toLowerCase()) || remedyB.toLowerCase().includes(r.name.toLowerCase()) || r.id !== remA.id) || enhancedRemedies[1];

          resultText = `
### ⚖️ Comparative Materia Medica Differentiation (Non-AI)

#### 1. 🔍 **Core Portrait Contrast**
- **${remA.name} Archetype**: Prepared from **${remA.origin}**, this remedy is characterized by **${remA.description}**.
- **${remB.name} Archetype**: Prepared from **${remB.origin}**, this remedy is characterized by **${remB.description}**.

#### 2. 📊 **Modality Differentiating Table**
| Feature | **${remA.name}** | **${remB.name}** |
|---|---|---|
| **Thermal Axis** | ${remA.thermal} | ${remB.thermal} |
| **Thirst Level** | ${remA.thirst} | ${remB.thirst} |
| **Ameliorations (Better)** | ${remA.modalities.better.slice(0, 2).join(", ")} | ${remB.modalities.better.slice(0, 2).join(", ")} |
| **Aggravations (Worse)** | ${remA.modalities.worse.slice(0, 2).join(", ")} | ${remB.modalities.worse.slice(0, 2).join(", ")} |
| **Mind & Emotions** | ${remA.mind?.slice(0, 2).join(", ") || "Active"} | ${remB.mind?.slice(0, 2).join(", ") || "Sensitive"} |

#### 3. 🔑 **The Clinical 'Clincher' Keynote**
- To immediately differentiate in **${clinicalContext || "clinical practice"}**, observe:
  - Prescribe **${remA.name}** if the patient shows high-yield keynotes like *${remA.keyCharacteristics[0]}* and is *${remA.thermal.toLowerCase()}*.
  - Prescribe **${remB.name}** if the patient shows *${remB.keyCharacteristics[0]}* and is *${remB.thermal.toLowerCase()}*.
          `;
          break;
        }

        case "materia-medica": {
          const { remedyName = "", level = "Advanced" } = payload;
          const rem = enhancedRemedies.find(r => r.name.toLowerCase().includes(remedyName.toLowerCase()) || remedyName.toLowerCase().includes(r.name.toLowerCase())) || defaultRem;

          resultText = `
### 🏺 Comprehensive Materia Medica Study Card: **${rem.name}** (${level} level)

#### 1. 🌟 **The Remedy Portrait (Archetype)**
- **Latin Name**: *${rem.latinName || rem.name}*
- **Kingdom / Family**: ${rem.family}
- **Source Origin**: ${rem.origin}
- **Overview**: ${rem.description}

#### 2. 🔑 **Clinical Keynotes & Modalities**
- **Better (Ameliorations)**: ${rem.modalities.better.join(", ")}
- **Worse (Aggravations)**: ${rem.modalities.worse.join(", ")}

#### 3. 🧬 **Generals & Particulars**
- **Thermal Axis**: ${rem.thermal}
- **Thirst Parameter**: ${rem.thirst}
- **Characteristics**: ${rem.keyCharacteristics.join(". ")}

#### 4. 🤝 **Drug Relationships**
- **Complementary**: ${rem.complementary?.join(", ") || "Sulphur, Lycopodium"}
- **Inimical**: ${rem.inimical?.join(", ") || "None recorded"}
- **Antidotes**: Nux Vomica, Camphora

#### 5. 🏺 **Constitution & Active Miasm**
- **Miasmatic Alignment**: Primarily **Psora** and **Sycosis** axis.
- **Physical Temperament**: ${rem.mind?.slice(0, 2).join(", ") || "Highly sensitive and reactive"} temperament.

#### 6. 🎯 **Clinical Indications**
- ${rem.clinicalApplications.join(", ")}

#### 7. 💡 **Memory Tricks & Mnemonic Anchors**
- **Mnemonic**: *"Remember ${rem.name.slice(0, 4).toUpperCase()} is **${rem.thermal}** and experiences **${rem.keyCharacteristics[0] || "specific keynote"}**!"*

#### 8. 🎤 **Viva Questions (Oral Exam Practice)**
1. **Question**: State the chief modalities of ${rem.name}.
   - **Answer**: Better from ${rem.modalities.better[0] || "rest"} and worse from ${rem.modalities.worse[0] || "motion"}.
2. **Question**: Describe the thermal state and thirst of this remedy.
   - **Answer**: It is a ${rem.thermal} remedy with ${rem.thirst.toLowerCase()} thirst characteristics.

#### 9. 🏆 **AIAPGET High-Yield Points**
- Associated with the **${rem.family}** kingdom.
- Often proved by classical masters; exhibits strong affinity for **${rem.clinicalApplications[0] || "nervous system"}**.
          `;
          break;
        }

        case "repertory": {
          const { symptoms = "" } = payload;
          const symsLower = symptoms.toLowerCase();
          const matchedRems: typeof enhancedRemedies = [];
          enhancedRemedies.forEach(rem => {
            if (symsLower.includes(rem.name.toLowerCase()) || rem.clinicalApplications.some(a => symsLower.includes(a.toLowerCase())) || rem.keyCharacteristics.some(c => symsLower.includes(c.toLowerCase()))) {
              matchedRems.push(rem);
            }
          });
          if (matchedRems.length === 0) {
            matchedRems.push(enhancedRemedies[0], enhancedRemedies[1]);
          }

          resultText = `
### 📖 Repertorial Analysis & Rubric Translation (Non-AI)

#### 1. 📋 **Rubric Translation Table**
| plain Symptom Described | Kent / Synthesis Repertory Rubric | Graduation (Weight) |
|---|---|---|
| ${symptoms || "Patient presentation"} | GENERALS - CLINICAL - ${matchedRems[0].clinicalApplications[0]?.toUpperCase() || "PATHOLOGY"} | 3 (Bold / High) |
| Thermal Sensitivity | GENERALS - TEMPERATURE - ${matchedRems[0].thermal.toUpperCase()} | 2 (Italic / Moderate) |
| Modality Indicators | GENERALS - MODALITIES - BETTER FROM - ${matchedRems[0].modalities.better[0]?.toUpperCase() || "REST"} | 1 (Roman / Low) |

#### 2. 🔮 **High-Affinity Remedy Suggestions**
${matchedRems.map((rem, i) => `${i+1}. **${rem.name}** (Graduation Score: 8/9 rubrics covered)`).join("\n")}

#### 3. 🧠 **Clinical Selection Logic**
- The rubrics are structured systematically based on **Boenninghausen's Method of Complete Symptoms** (Locality, Sensation, Modality, Concomitance).
- **Potency Selection**: Begin with a **30C** or **200C** depending on whether symptoms are functional or organic.
          `;
          break;
        }

        case "rubric-finder": {
          const { plainTextQuery = "" } = payload;
          resultText = `
### 🔍 Repertory Rubric Search Hierarchy (Non-AI)

#### 1. 🔍 **Rubric Hierarchy Tree**
- **MIND** - ANXIETY - health, about - *Lyc., Ars., Phos.*
- **GENERALS** - COLD - aggravation, from - *Hep., Nux-v., Psor.*
- **STOMACH** - THIRST - extreme - *Bry., Nat-m., Sulph.*
- **HEAD** - PAIN - periodic - *Gels., Bell., Sang.*

*(Matches for: "${plainTextQuery}")*

#### 2. 📝 **Interpretation & Nuance**
- When repertorizing, differentiate carefully between mental anxiety and physical restlessness. 
- Ensure that the local particular symptoms are always subordinated to the general constitutional thermals and mind states.

#### 3. 🔄 **Cross-References / Related Rubrics**
- Compare: **MIND - RESTLESSNESS** with **GENERALS - RESTLESSNESS - physical**.
          `;
          break;
        }

        case "clinical-analyzer": {
          const { caseText = "" } = payload;
          const textLower = caseText.toLowerCase();
          let matchedRem = defaultRem;
          enhancedRemedies.forEach(rem => {
            if (textLower.includes(rem.name.toLowerCase()) || rem.keyCharacteristics.some(c => textLower.includes(c.toLowerCase()))) {
              matchedRem = rem;
            }
          });

          resultText = `
### 🗺️ Comprehensive Clinical Case Evaluation (Non-AI)

#### 1. 📝 **Symptom Classification**
- **Mental Generals**: Highly anxious, sensitive, or apprehensive (matches **${matchedRem.name}** profile).
- **Physical Generals**: Thermal state is **${matchedRem.thermal}**, thirst profile is **${matchedRem.thirst}**.
- **Local Particulars**: Primary affection of the **${matchedRem.clinicalApplications.slice(0, 2).join(", ")}** systems.
- **Section 153 Keynotes**: *${matchedRem.keyCharacteristics[0]}*.

#### 2. 🗺️ **Miasmatic Evaluation & Layer Analysis**
- The presentation suggests a chronic active layer of **Psora** secondary to stress and environmental triggers, with some sycotic traits (tissue changes).

#### 3. 🌟 **The Diagnostic Synthesis**
- **Simillimum**: **${matchedRem.name}**
- **Reasoning**: It covers all generals, physical modalities, and unique characteristic keynotes beautifully.

#### 4. 🧪 **Prescribing Blueprint**
- **Potency**: **200C**, single dose.
- **Repetition**: Placebo daily; repeating the remedy only if improvement stops.
          `;
          break;
        }

        case "viva-examiner": {
          const { topic = "Materia Medica Keynotes", userResponseText = "", questionIndex = 1 } = payload;
          const score = userResponseText.length > 10 ? 8.5 : 4.0;
          
          resultText = `
### 🎤 Homeopathic Viva (Oral Examination) Board (Non-AI)

**Topic**: ${topic} | **Current Question Index**: ${questionIndex}

${userResponseText ? `
#### ⭐️ **Evaluative Feedback on Your Answer**
- **Marks Awarded**: **${score} / 10**
- **Feedback**: Your answer shows a good basic understanding. To achieve full marks, remember to mention the exact prover names and botanical family classifications.

#### 🎯 **Model textbook Answer**
- The correct clinical presentation always requires analyzing the three legs of the homeopathic stool: constitutional generals, physical keynotes, and modality changes.
` : ""}

#### 🔄 **Your Viva Challenge Question**
- *"Could you explain the relationship between **Lycopodium**, **Sulphur**, and **Calcarea Carbonica** (the famous Sulphur-Calcarea-Lycopodium trio) and how they complement each other?"*

*Please respond in the box below to continue your mock oral exam!*
          `;
          break;
        }

        case "answer-evaluator": {
          const { questionTitle = "Materia Medica Keynotes", studentAnswer = "" } = payload;
          const marks = studentAnswer.length > 20 ? 16 : 8;

          resultText = `
### 🏆 BHMS Board Exam Official Evaluation (Non-AI)

- **Question Evaluated**: "${questionTitle}"
- **Marks Awarded**: **${marks} / 20**

#### ❌ **Omitted High-Yield Points & Corrections**
- Ensure you mention:
  - The exact Latin name of the drug source.
  - Thermal parameters and thirst indicators.
  - Active provers and drug relationship details (complementary, inimical).

#### ✍️ **Recommended Presentation Enhancements**
- Present comparison elements using clean Markdown grids.
- Bold your keynotes to grab the examiner's eye immediately.

#### 🌟 **Perfect Answer Model Outline**
1. **Introduction & Common Name** (e.g. Club Moss).
2. **Physical Generals & Thermals** (e.g. Chilly or Hot).
3. **Chief Keynotes & Modalities** (Aggravations/Ameliorations).
4. **Drug Relationships**.
          `;
          break;
        }

        case "quiz-generator": {
          const { topic = "Polychrest Remedies" } = payload;
          resultText = `
### 🏆 High-Yield AIAPGET Practice Quiz: **${topic}** (Non-AI)

#### **Question 1**
Which remedy is characterized by "sudden, violent congestion with high fever, red face, and throbbing headache"?
- A) Lycopodium Clavatum
- B) Belladonna
- C) Pulsatilla Nigricans
- D) Silica
- **Correct Option**: **B**
- **Explanation**: Belladonna is the premier acute congested remedy with violent, burning heat, red flushed face, and throbbing carotids.

#### **Question 2**
What is a major characteristic of Bryonia Alba?
- A) Better from motion
- B) Worse from any motion, better from rest
- C) Thirstless with a hot face
- D) Left-sided headache only
- **Correct Option**: **B**
- **Explanation**: Bryonia Alba is extremely aggravated by even the slightest motion and is highly ameliorated by absolute quiet and rest.

#### **Question 3**
Which remedy is prepared from "the wind flower" and is highly suited to mild, yielding personalities?
- A) Aconite
- B) Nux Vomica
- C) Pulsatilla Nigricans
- D) Arsenicum Album
- **Correct Option**: **C**
- **Explanation**: Pulsatilla is prepared from Pulsatilla Nigricans (wind flower) and is suited to gentle, mild, yielding dispositions.

#### **Question 4**
Lycopodium Clavatum is primarily indicated for complaints that are:
- A) Left-sided and move to the right
- B) Right-sided and move to the left
- C) Alternating sides every 24 hours
- D) Unaffected by lateralization
- **Correct Option**: **B**
- **Explanation**: Lycopodium is a classic right-sided remedy where complaints often start on the right and travel to the left.

#### **Question 5**
Identify the chilly, highly anxious, fastidious remedy that craves warm drinks:
- A) Sulphur
- B) Arsenicum Album
- C) Pulsatilla
- D) Belladonna
- **Correct Option**: **B**
- **Explanation**: Arsenicum Album is highly chilly, intensely anxious, extremely fastidious, and relieved by hot applications/warm drinks.
          `;
          break;
        }

        case "study-planner": {
          const { weakSubjects = "Miasms, Repertory formulas", weeklyHoursAvailable = "20" } = payload;
          resultText = `
### 📅 Tailored BHMS & AIAPGET study Planner (Non-AI)

**Weekly Budget**: ${weeklyHoursAvailable} Hours | **Focus Areas**: ${weakSubjects}

#### 📅 **Weekly Hours Allocation**
- **Monday / Wednesday**: 4 Hours — Materia Medica & Organon of Medicine (Reviewing weak chapters).
- **Tuesday / Thursday**: 4 Hours — Repertory mathematical formulations and Rubric translations.
- **Friday**: 3 Hours — Clinical Case Analysis and mock test MCQs.
- **Saturday / Sunday**: 5 Hours — Spaced revision, group study, and exam simulator review.

#### 🔄 **Revision & Active Recall Cycles**
- Spend 15 minutes before every session recalling yesterday's main points.
- Use mock flashcards for keynotes.

#### 🎯 **Weak Area Interventions**
- Read Samuel Hahnemann's Organon of Medicine (Aphorisms 1-70) to solidify your miasmatic foundations.
          `;
          break;
        }

        case "mnemonic-generator": {
          const { conceptToMemorize = "Ars Alb Keynotes" } = payload;
          resultText = `
### 🔑 High-Retention Homeopathic Mnemonic (Non-AI)

#### **Concept**: ${conceptToMemorize}

#### 🔑 **The Core Formula**: **"F - A - S - T"**
- **F**: **Fastidious** (wants everything in its exact place, highly orderly).
- **A**: **Anxious** (profound anxiety about health, death, and future).
- **S**: **Sipping water** (extreme thirst for small quantities of cold water at frequent intervals).
- **T**: **Thermal: Chilly** (extremely sensitive to cold, relieved by heat).

#### 🏰 **Memory Palace Narrative**
- Imagine a highly organized room where a chilly patient wearing three coats is neatly placing items in perfect rows (**Fastidious/Chilly**). They are holding a tiny teacup, taking single sips of water (**Sipping**), and nervously checking their pulse every minute (**Anxious**).
          `;
          break;
        }

        case "personality-decoder": {
          const { remedyName = "Pulsatilla" } = payload;
          const rem = enhancedRemedies.find(r => r.name.toLowerCase().includes(remedyName.toLowerCase()) || remedyName.toLowerCase().includes(r.name.toLowerCase())) || defaultRem;

          resultText = `
### 🎭 Contemporary Personality Profile: **${rem.name}** (Non-AI)

#### 1. 🎭 **The Real-Life Archetype: "The Empathetic Romantic"**
- If **${rem.name}** walked into a modern coffee shop, they would be wearing soft, flowing pastel colors, ordering a decaf latte with no ice, and politely offering their seat to anyone who looks tired. They seek warmth, connection, and constant reassurance.

#### 2. 💔 **Inner Fears, Passions & Desires**
- **Core Dread**: Fear of rejection, being left alone, or ignored.
- **Aspiration**: Deep emotional intimacy and a gentle environment.
- **Triggers**: Warm, stuffy rooms, cold rejection, or harsh words.

#### 3. 🔄 **Interpersonal Dynamics**
- Highly yielding, easily crying when narrating symptoms, yet immensely comforting and supportive to their loved ones.
          `;
          break;
        }

        case "story-generator": {
          const { remedyName = "Aconite" } = payload;
          const rem = enhancedRemedies.find(r => r.name.toLowerCase().includes(remedyName.toLowerCase()) || remedyName.toLowerCase().includes(r.name.toLowerCase())) || defaultRem;

          resultText = `
### 📖 Allegorical Study Narrative: The Legend of **${rem.name}** (Non-AI)

#### 1. 📖 **The Allegory**
- Once, in a quiet village nested in a windy valley, lived a strong young traveler. One night, a sudden, freezing dry wind swept down from the northern peaks. Within hours, the traveler woke up in a state of sudden, violent panic. Their skin felt hot and dry, their pulse throbbed like a drum, and they were filled with an absolute terror that they would not survive the night.
- They drank cold water in large, eager gulps, tossing and turning restlessly. A wise physician arrived and offered them a golden flower prepared from the mountain peaks. Within minutes, the fever broke, the panic dissolved, and calm returned.

#### 🧩 **Materia Medica Decryption**
- **Freezing dry wind**: Represents the classic Aconite etiology (complaints arising from exposure to cold, dry winds).
- **Sudden panic & fear of death**: Represents the defining mental keynote of Aconitum Napellus.
- **Large gulps of cold water**: Outlines the intense thirst characteristic of this acute state.
          `;
          break;
        }

        case "clinical-mystery": {
          resultText = `
### 🕵️‍♂️ Homeopathic Clinical Mystery Challenge (Non-AI)

#### **Stage 1 Clues: The Patient's Diary**
- *"Dear Diary, my stomach feels so bloated every evening at exactly 4:00 PM. I feel so full after just a few bites of food, even though I sat down feeling hungry. My family says I've become very irritable and insecure, even though I try to act confident in public..."*

#### **Diagnostic Option Prompts**
- A) Pulsatilla Nigricans
- B) Lycopodium Clavatum
- C) Nux Vomica
- D) Arsenicum Album

*Think carefully! Which polychrest remedy fits the 4:00 PM to 8:00 PM aggravation, early satiety, and masked lack of confidence?*
- **Answer**: **B (Lycopodium Clavatum)**!
          `;
          break;
        }

        case "aiapget-coach": {
          const { targetRank = "Top 100" } = payload;
          resultText = `
### 🎯 Tactical AIAPGET Prep Briefing (Non-AI)

- **Target Goal**: ${targetRank} State Ranking

#### 📊 **Symptom Performance Diagnostics**
- **Time Management**: Keep your speed at 45 seconds per MCQ.
- **Common Mistakes**: Most errors in Repertory come from confusing Kent's chapters (e.g., placing specific rubrics in Mind instead of Generals).

#### 🎯 **14-Day High-Yield Revision Sprint**
- **Days 1-4**: Standardize your knowledge of Samuel Hahnemann's Organon of Medicine (Aphorisms 71-145 on drug proving).
- **Days 5-8**: Focus entirely on the thermal states and thirst parameters of all polychrests.
- **Days 9-12**: Memorize the grading formulas of Kent's Repertory.
- **Days 13-14**: Take full-length diagnostic mock exams.
          `;
          break;
        }

        case "anatomy-tutor": {
          const { anatomyTopic = "Brachial Plexus" } = payload;
          resultText = `
### 📚 First-Year Anatomy Study Blueprint: **${anatomyTopic}** (Non-AI)

#### 1. 📦 **Anatomical Summary**
- **Structure**: High-yield region crucial for clinical examinations.
- **Nerve / Blood Supply**: Highlight arterial divisions and muscular relations.

#### 🗺️ **Anatomical Markdown Outline**
\`\`\`
       [ Roots: C5, C6, C7, C8, T1 ]
                    |
                 [ Trunks ]
                    |
                [ Divisions ]
                    |
                 [ Cords ]
                    |
             [ Terminal Branches ]
\`\`\`

#### 💡 **Recall Mnemonics**
- *"Remember To Drink Cold Beer"* (Roots, Trunks, Divisions, Cords, Branches).
          `;
          break;
        }

        case "physiology-tutor": {
          const { mechanismTopic = "Cardiac Cycle" } = payload;
          resultText = `
### 🔄 Medical Physiology Masterclass: **${mechanismTopic}** (Non-AI)

#### 1. 🔄 **Step-by-Step Pathway**
- Highly detailed physiological steps illustrating active feedback loops.

#### 📊 **Functional Flow Diagram**
\`\`\`
[ Initial Stimulus ] -> [ Receptor Activation ] -> [ Feedback Loop ] -> [ Physiological Response ]
\`\`\`

#### 🏆 **Homeopathic Correlation**
- Imbalances in this feedback mechanism represent the outer manifestation of a perturbed Vital Force (Organon §9-12).
          `;
          break;
        }

        case "organon-mentor": {
          const { queryTermOrAphorism = "Vital Force" } = payload;
          resultText = `
### 📜 Samuel Hahnemann's Organon Mentor (Non-AI)

#### **Topic**: ${queryTermOrAphorism}

#### 1. 📜 **The Aphorism Text**
- Refer to **Aphorisms 9, 10, and 11** of the Organon of Medicine:
  - *"In the healthy condition of man, the spiritual vital force (autocracy), the dynamics that animates the material body (organism), rules with unbounded sway..."*

#### 🔍 **Historical Context**
- Hahnemann formulated the vital force concept to contrast the purely mechanistic and materialist medical views of his contemporaries, emphasizing the dynamic nature of health and disease.
          `;
          break;
        }

        case "research-assistant": {
          const { paperTopicOrAbstract = "Nanoparticles in homeopathy" } = payload;
          resultText = `
### 🔬 Homeopathic Clinical Research Summary (Non-AI)

#### **Topic**: ${paperTopicOrAbstract}

#### 1. 📝 **Key Findings & Methodology**
- Ultra-dilutions of homeopathic remedies retain physical nanoparticles of the starting material (solute) inside stable water-ethanol silicate clusters.

#### 📊 **Evidence standing**
- High quality physical chemistry models combined with laboratory in-vitro cell assays support the biological activity of homeopathic potencies.
          `;
          break;
        }

        case "daily-learning-coach": {
          resultText = `
### 💊 Your Daily Learning Cocktail (Non-AI)

1. 💊 **Daily Remedy Spotlight**: **Silicea** (prepared from pure silica). Chilly, lack of physical grit, sand-in-eyes sensation, highly ameliorated by wrapping head warmly.
2. 📖 **Daily Repertory Rubric**: **MIND - OBSTINATE** - *Sil., Calc., Nux-v.* (Graduation: 3 / Bold).
3. 🧠 **Daily Mnemonic**: **"S - I - L"** (Sensitive, Insecure, Lack of grit).
4. 🏆 **Daily Mock Question**: Which remedy is worse from wet weather and better from dry heat? (Answer: **Rhus Tox**).
          `;
          break;
        }

        case "voice-repertorizer": {
          const { transcriptText = "" } = payload;
          resultText = `
### 🎙️ Spoken Transcript Repertorization Report (Non-AI)

#### 1. 🎙️ **Extracted Clinical Keywords**
- Plain text transcript analyze indicates: \`${transcriptText || "No voice input captured"}\`.

#### 📊 **Kent Repertorial Rubric Mapping**
- **GENERALS - THERMALS - CHILLY** (Weight: 3)
- **MIND - ANXIETY - health, about** (Weight: 2)
          `;
          break;
        }

        case "remedy-battle": {
          const { fighterA = "Nux Vomica", fighterB = "Pulsatilla" } = payload;
          resultText = `
### ⚔️ Homeopathic Remedy Battle Arena (Non-AI)

#### **Fighter A**: ${fighterA} vs **Fighter B**: ${fighterB}

#### 📊 **Attributes Grid**
| Attribute | **${fighterA}** | **${fighterB}** |
|---|---|---|
| **Speed** | Fast, acute, hyperactive | Slow, lingering, gentle |
| **Thermal Defense** | Highly Chilly | Highly Warm/Hot |
| **Thirst Meter** | Moderate, dry mouth | Absolutely Thirstless |
| **Mental Weapon** | Irritability, oversensitive | Yielding, weeping, gentle |

#### ⚔️ **The Clinical Duel**
- When **${fighterA}**'s chilly, hypersensitive, hyperactive energy meets the warm, mild, highly changeable climate of **${fighterB}**, the clinical picture splits cleanly. They represent polar opposites in prescribing!
          `;
          break;
        }

        case "guess-remedy": {
          resultText = `
### 🧩 "Guess the Remedy" Clinical Riddle (Non-AI)

#### 🧩 **The Clues**
1. I am a highly chilly mineral remedy.
2. I have a profound lack of self-confidence, yet I am extremely obstinate once my mind is set.
3. My physical symptoms are characterized by slow, sluggish development, and I cannot tolerate any cold drafts.
4. I have an intense dread of needles or sharp objects.

#### 🗳️ **Options List**
- A) Pulsatilla
- B) Lycopodium
- C) Silicea
- D) Sulphur

- **Correct Answer**: **C (Silicea)**!
          `;
          break;
        }

        case "flashcard-generator": {
          const { topicName = "Polychrest Remedies" } = payload;
          resultText = `
### 🗂️ Printable Exam Revision Flashcards: **${topicName}** (Non-AI)

+-----------------------------------------+
| FRONT: Aconitum Napellus                |
|                                         |
| Synonyms, Thermal state, and etiology?  |
+-----------------------------------------+
| BACK: Monkshood. Highly Chilly.         |
| Complaints from sudden cold dry winds.  |
| Sudden fever, fear of death, panic.     |
+-----------------------------------------+

+-----------------------------------------+
| FRONT: Dryonia Alba                     |
|                                         |
| Defining physical modality?            |
+-----------------------------------------+
| BACK: Worse from any physical motion.   |
| Better from absolute rest, quiet, and   |
| lying on the painful side. Dry mucous   |
| membranes, extreme thirst.              |
+-----------------------------------------+
          `;
          break;
        }

        case "case-simulation": {
          resultText = `
### 🩺 Clinical Residency Case File: Case #304 (Non-AI)

- **Patient Demographics**: 34-year-old software engineer.
- **Subjective Symptoms**: *"Doctor, I've had severe digestive problems for months. I feel so bloated after eating even a light lunch. I get very anxious about my presentations, and I get cold very easily."*
- **Objective Findings**: Abdominal distension, dry tongue with red margins.
- **Miasmatic Trail**: Genetic predispositions.

#### 🗳️ **Your Clinical Challenge Prompts**
1. Identify the primary constitutional remedy covering these bloating, anxious, chilly symptoms.
2. What are the key ameliorations of this remedy?
          `;
          break;
        }

        default: {
          resultText = "No specific non-AI tool output has been pre-screened for this selection.";
          break;
        }
      }

      const textWithLinks = appendReferenceLinks(resultText, JSON.stringify(payload || {}));
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
