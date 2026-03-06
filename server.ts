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
  const db = new Database("blog.db");
  
  // Initialize table
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT,
      excerpt TEXT,
      content TEXT,
      author TEXT,
      date TEXT,
      category TEXT,
      image TEXT,
      tags TEXT
    )
  `);

  // Seed data if empty
  const count = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO posts (id, title, excerpt, content, author, date, category, image, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const transaction = db.transaction((posts) => {
      for (const post of posts) {
        insert.run(
          post.id,
          post.title,
          post.excerpt,
          post.content,
          post.author,
          post.date,
          post.category,
          post.image,
          JSON.stringify(post.tags)
        );
      }
    });

    transaction(allBlogPosts);
    console.log("Database seeded with", allBlogPosts.length, "posts.");
  }

  app.use(express.json());

  // API Routes
  app.get("/api/posts", (req, res) => {
    const { category, search } = req.query;
    let query = "SELECT * FROM posts";
    const params: any[] = [];

    if (category || search) {
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
      
      query += " " + conditions.join(" AND ");
    }

    const posts = db.prepare(query).all(...params) as any[];
    const formattedPosts = posts.map(p => ({
      ...p,
      tags: JSON.parse(p.tags)
    }));
    
    res.json(formattedPosts);
  });

  app.get("/api/posts/:id", (req, res) => {
    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id) as any;
    if (post) {
      res.json({
        ...post,
        tags: JSON.parse(post.tags)
      });
    } else {
      res.status(404).json({ error: "Post not found" });
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
