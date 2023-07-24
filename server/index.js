import express, { Router } from "express";
import serverless from "serverless-http";
import Recipe from "./controllers/recipe.js";
import { isLoggedIn } from "./helpers/middleware.js";

const app = express();

const router = Router();
router.use(express.json());
app.use("/api", router);

// Recipe routes
router.get("/recipe", Recipe.getAllRecipe);
router.get("/recipe/:id", Recipe.getRecipeById);
router.post("/recipe", isLoggedIn, Recipe.createRecipe);
router.put("/recipe/:id", isLoggedIn, Recipe.updateRecipe);
router.delete("/recipe/:id", isLoggedIn, Recipe.deleteRecipe);

// Start the server
app.listen(8800, () => console.log("Backend server is running..."));
export const handler = serverless(app);
