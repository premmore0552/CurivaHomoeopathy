import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import { allBlogPosts } from "./src/data/blogPosts";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Database setup
  const db = new Database(":memory:");
  
  // Initialize table if not exists
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      title TEXT,
      excerpt TEXT,
      content TEXT,
      author TEXT,
      date TEXT,
      category TEXT,
      image TEXT,
      tags TEXT,
      readingTime TEXT,
      seoTitle TEXT,
      quickSummary TEXT,
      keyPatterns TEXT,
      whoItSuits TEXT,
      whenToConsider TEXT,
      modalities TEXT,
      comparisons TEXT,
      relatedCarePlans TEXT,
      citations TEXT,
      relatedRemedies TEXT,
      relatedConditions TEXT
    )
  `);

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

  // Check if data exists before seeding
  // Note: We'll recreate the table if columns are missing or just drop and recreate for simplicity in dev
  db.exec("DROP TABLE IF EXISTS posts");
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      title TEXT,
      excerpt TEXT,
      content TEXT,
      author TEXT,
      date TEXT,
      category TEXT,
      image TEXT,
      tags TEXT,
      readingTime TEXT,
      seoTitle TEXT,
      quickSummary TEXT,
      keyPatterns TEXT,
      whoItSuits TEXT,
      whenToConsider TEXT,
      modalities TEXT,
      comparisons TEXT,
      relatedCarePlans TEXT,
      citations TEXT,
      relatedRemedies TEXT,
      relatedConditions TEXT
    )
  `);

  console.log("Seeding database...");
  const insert = db.prepare(`
    INSERT INTO posts (
      id, slug, title, excerpt, content, author, date, category, image, tags, readingTime,
      seoTitle, quickSummary, keyPatterns, whoItSuits, whenToConsider, modalities,
      comparisons, relatedCarePlans, citations, relatedRemedies, relatedConditions
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const transaction = db.transaction((posts) => {
    for (const post of posts) {
      const slug = (post as any).slug || generateSlug(post.title, post.id);
      insert.run(
        post.id,
        slug,
        post.title,
        post.excerpt,
        post.content,
        post.author,
        post.date,
        post.category,
        post.image,
        JSON.stringify(post.tags || []),
        estimateReadingTime(post.content),
        post.seoTitle || null,
        JSON.stringify((post as any).quickSummary || []),
        JSON.stringify((post as any).keyPatterns || []),
        (post as any).whoItSuits || null,
        JSON.stringify((post as any).whenToConsider || []),
        JSON.stringify((post as any).modalities || { better: [], worse: [] }),
        JSON.stringify((post as any).comparisons || []),
        JSON.stringify((post as any).relatedCarePlans || []),
        JSON.stringify((post as any).citations || []),
        JSON.stringify((post as any).relatedRemedies || []),
        JSON.stringify((post as any).relatedConditions || [])
      );
    }
  });

  transaction(allBlogPosts);
  console.log("Database seeded with", allBlogPosts.length, "posts.");

  app.use(express.json());

  // API Routes
  app.get("/api/posts", (req, res) => {
    const { category, search, tag } = req.query;
    let query = "SELECT * FROM posts";
    const params: any[] = [];

    if (category || search || tag) {
      query += " WHERE";
      const conditions: string[] = [];
      
      if (category && category !== "All") {
        conditions.push("category = ?");
        params.push(category);
      }
      
      if (search) {
        conditions.push("(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)");
        const searchParam = `%${search}%`;
        params.push(searchParam, searchParam, searchParam);
      }

      if (tag) {
        conditions.push("tags LIKE ?");
        params.push(`%"${tag}"%`);
      }
      
      query += " " + conditions.join(" AND ");
    }

    const posts = db.prepare(query).all(...params) as any[];
    const formattedPosts = posts.map(p => ({
      ...p,
      tags: p.tags ? JSON.parse(p.tags) : [],
      quickSummary: p.quickSummary ? JSON.parse(p.quickSummary) : [],
      keyPatterns: p.keyPatterns ? JSON.parse(p.keyPatterns) : [],
      whenToConsider: p.whenToConsider ? JSON.parse(p.whenToConsider) : [],
      modalities: p.modalities ? JSON.parse(p.modalities) : { better: [], worse: [] },
      comparisons: p.comparisons ? JSON.parse(p.comparisons) : [],
      relatedCarePlans: p.relatedCarePlans ? JSON.parse(p.relatedCarePlans) : [],
      citations: p.citations ? JSON.parse(p.citations) : [],
      relatedRemedies: p.relatedRemedies ? JSON.parse(p.relatedRemedies) : [],
      relatedConditions: p.relatedConditions ? JSON.parse(p.relatedConditions) : []
    }));
    
    res.json(formattedPosts);
  });

  app.get("/api/posts/slug/:slug", (req, res) => {
    try {
      console.log(`[API] Fetching post by slug: ${req.params.slug}`);
      let post = db.prepare("SELECT * FROM posts WHERE slug = ?").get(req.params.slug) as any;
      
      // Fallback to checking by ID if slug doesn't match
      if (!post) {
        post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.slug) as any;
      }

      if (post) {
        const safeParse = (str: string | null, fallback: any = []) => {
          if (!str) return fallback;
          try {
            return JSON.parse(str);
          } catch (e) {
            console.error(`Field parsing error for post ${post.id}:`, e);
            return fallback;
          }
        };

        res.json({
          ...post,
          tags: safeParse(post.tags),
          quickSummary: safeParse(post.quickSummary),
          keyPatterns: safeParse(post.keyPatterns),
          whenToConsider: safeParse(post.whenToConsider),
          modalities: safeParse(post.modalities, { better: [], worse: [] }),
          comparisons: safeParse(post.comparisons),
          relatedCarePlans: safeParse(post.relatedCarePlans),
          citations: safeParse(post.citations),
          relatedRemedies: safeParse(post.relatedRemedies),
          relatedConditions: safeParse(post.relatedConditions)
        });
      } else {
        console.warn(`[API] Post not found for slug or id: ${req.params.slug}`);
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      console.error(`[API] Error fetching post by slug: ${req.params.slug}`, error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.get("/api/posts/:id", (req, res) => {
    try {
      const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id) as any;
      
      const safeParse = (str: string | null, fallback: any = []) => {
        if (!str) return fallback;
        try {
          return JSON.parse(str);
        } catch (e) {
          return fallback;
        }
      };

      if (post) {
        res.json({
          ...post,
          tags: safeParse(post.tags),
          quickSummary: safeParse(post.quickSummary),
          keyPatterns: safeParse(post.keyPatterns),
          whenToConsider: safeParse(post.whenToConsider),
          modalities: safeParse(post.modalities, { better: [], worse: [] }),
          comparisons: safeParse(post.comparisons),
          relatedCarePlans: safeParse(post.relatedCarePlans),
          citations: safeParse(post.citations),
          relatedRemedies: safeParse(post.relatedRemedies),
          relatedConditions: safeParse(post.relatedConditions)
        });
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
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
