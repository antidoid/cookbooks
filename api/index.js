import express, { urlencoded } from "express";
import Recipe from "./models/recipe.js";

const app = express();
app.use(express.json());

// Get all the recipes
app.get("/recipe", async (req, res) => {
  try {
    const recipes = await Recipe.getAll();
    res.status(200).json(recipes);
  } catch (e) {
    res.status(404).send("Error fetching all the recipes");
    console.error(e);
  }
});

// Get one recipe
app.get("/recipe/:id", async (req, res) => {
  try {
    const recipe = await Recipe.getById(req.params.id);
    res.status(200).json(recipe);
  } catch (e) {
    res.status(404).send("Error fetching the recipe");
    console.error(e);
  }
});

// Create new recipe
app.post("/recipe", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(200).send("Recipe created successfully");
  } catch (e) {
    res.status(404).send("Error creating the recipe");
    console.error(e);
  }
});

// Update a recipe
app.put("/recipe/:id", async (req, res) => {
  try {
    const modRecipe = new Recipe(req.body);
    await modRecipe.update(req.params.id);
    res.status(200).send("Recipe modified successfully");
  } catch (e) {
    res.status(404).send("Error modifying the recipe");
    console.error(e);
  }
});

// Delete a recipe
app.delete("/recipe/:id", async (req, res) => {
  try {
    await Recipe.delete(req.params.id);
    res.status(200).send("Recipe delted successfully");
  } catch (e) {
    res.status(404).send("Error deleting the recipe");
    console.error(e);
  }
});

// Start the server
app.listen(8800, () => {
  console.log("Started the backend server");
});
