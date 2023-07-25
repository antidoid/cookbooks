import Recipe from "../models/recipe.js";
import Ingredient from "../models/ingredient.js";

const recipe = {
    // Get all the recipes
    getAllRecipe: async (req, res) => {
        try {
            // Get all the recipes
            const recipes = await Recipe.getAll();
            res.status(200).json(recipes);
        } catch (e) {
            res.status(500).send("Error fetching all the recipes");
            console.error(e);
        }
    },

    // Get one recipe
    getRecipeById: async (req, res) => {
        try {
            const recipe = await Recipe.getById(req.params.id);
            // Get all its ingredients
            recipe.ingredients = await Ingredient.getAll(req.params.id);
            // Get the user comments
            res.status(200).json(recipe);
        } catch (e) {
            res.status(500).send("Error fetching the recipe");
            console.error(e);
        }
    },

    // Create new recipe
    createRecipe: async (req, res) => {
        try {
            const recipe = new Recipe(req.body);
            await recipe.save();
            res.status(200).send("Recipe created successfully");
        } catch (e) {
            res.status(500).send("Error creating the recipe");
            console.error(e);
        }
    },

    // Update a recipe
    updateRecipe: async (req, res) => {
        try {
            const modRecipe = new Recipe(req.body);
            await modRecipe.update(req.params.id);
            res.status(200).send("Recipe modified successfully");
        } catch (e) {
            res.status(500).send("Error modifying the recipe");
            console.error(e);
        }
    },

    // Delete a recipe
    deleteRecipe: async (req, res) => {
        try {
            await Recipe.remove(req.params.id);
            res.status(200).send("Recipe delted successfully");
        } catch (e) {
            res.status(500).send("Error deleting the recipe");
            console.error(e);
        }
    },
};

export default recipe;
