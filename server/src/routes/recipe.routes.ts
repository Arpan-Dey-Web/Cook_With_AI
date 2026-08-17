import { Router } from "express";

import { generateRecipes } from "../controllers/recipe.controller.js";

const router = Router();

router.post("/generate", generateRecipes);

export default router;