import express, { Router } from "express";
import serverless from "serverless-http";
import Recipe from "./controllers/recipe.js";
import { isLoggedIn } from "./helpers/middleware.js";

const app = express();

const router = Router();
router.use(express.json());
app.use("/api", router);

// Recipe routes
app.get("/recipe", Recipe.getAllRecipe);
app.get("/recipe/:id", Recipe.getRecipeById);
app.post("/recipe", isLoggedIn, Recipe.createRecipe);
app.put("/recipe/:id", isLoggedIn, Recipe.updateRecipe);
app.delete("/recipe/:id", isLoggedIn, Recipe.deleteRecipe);

// Start the server
app.listen(8800, () => console.log("Backend server is running..."));
export const handler = serverless(api);
