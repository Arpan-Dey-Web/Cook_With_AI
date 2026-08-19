import { Router } from "express";

import { generateRecipes } from "../controller/recipe.controller.js";

const router = Router();

router.post("/generate", generateRecipes);

export default router;