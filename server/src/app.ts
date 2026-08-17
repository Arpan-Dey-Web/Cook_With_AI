import cors from "cors";
import express from "express";

import recipeRoutes from "./routes/recipe.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Cook With AI API is running",
  });
});

app.use("/api/recipes", recipeRoutes);

export default app;