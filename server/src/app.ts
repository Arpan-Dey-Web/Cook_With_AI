import cors from "cors";
import express from "express";

import recipeRoutes from "./routes/recipe.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Request logging middleware
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === "POST") {
    console.log("[REQ BODY]", JSON.stringify(req.body, null, 2));
  }
  next();
});


app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Cook With AI API is running",
  });
});


app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Cook With AI API is running",
  });
});

app.use("/api/recipes", recipeRoutes);

export default app;