import express from "express";
import Recipe from "./controllers/recipe.js";
import { isLoggedIn } from "../middleware.js";

const app = express();
app.use(express.json());

// Recipe routes
app.get("/recipe", Recipe.getAllRecipe);
app.get("/recipe/:id", Recipe.getRecipeById);
app.post("/recipe", isLoggedIn, Recipe.createRecipe);
app.put("/recipe/:id", isLoggedIn, Recipe.updateRecipe);
app.delete("/recipe/:id", isLoggedIn, Recipe.deleteRecipe);

// Start the server
app.listen(8800, () => console.log("Backend server is running..."));
