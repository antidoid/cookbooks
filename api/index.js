import express, { urlencoded } from "express";
import Recipe from "./controllers/recipe.js";

const app = express();
app.use(express.json());

// Recipe routes
app.get("/recipe", Recipe.getAllRecipe);
app.get("/recipe/:id", Recipe.getRecipeById);
app.post("/recipe", Recipe.createRecipe);
app.put("/recipe/:id", Recipe.updateRecipe);
app.delete("/recipe/:id", Recipe.deleteRecipe);

// Start the server
app.listen(8800, () => {
  console.log("Started the backend server");
});
