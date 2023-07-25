import db from "./connection.js";
import Ingredient from "../models/ingredient.js";

class Recipe {
  constructor({
    name,
    description,
    preparetime,
    serves,
    difficulty,
    recipetype,
    category,
    instruction,
    videolink,
    imagelink,
    ingredients,
  }) {
    this.name = name;
    this.description = description;
    this.preparetime = preparetime;
    this.serves = serves;
    this.difficulty = difficulty;
    this.recipetype = recipetype;
    this.category = category;
    this.instruction = instruction;
    this.videolink = videolink;
    this.imagelink = imagelink;
    this.ingredients = ingredients;
  }

  // Code to get all recipes from the database
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM recipe", (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  // Code to get a recipe by ID from the database
  static getById(id) {
    return new Promise((resolve, reject) => {
      const q = "SELECT * FROM recipe WHERE id = ?";
      db.query(q, [id], (err, res) => {
        if (err) return reject(err);
        const [data] = res;
        resolve(data);
      });
    });
  }

  // Code to save a recipe to the database
  save() {
    return new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) return reject(err);

        const q = "INSERT INTO recipe SET ?";
        const { ingredients, ...values } = this;

        db.query(q, [values], (err, result) => {
          if (err) return db.rollback(() => reject(err));

          const ingredientPromises = [];
          ingredients.forEach(async (ingredient) => {
            const ingredientObj = new Ingredient(ingredient);
            ingredientPromises.push(
              await new Promise((resolve, reject) => {
                ingredientObj.save(result.insertId).then(resolve).catch(reject);
              }),
            );
          });

          Promise.all(ingredientPromises)
            .then(() => {
              db.commit((err) => {
                if (err) return db.rollback(() => reject(err));
                resolve();
              });
            })
            .catch((err) => {
              return db.rollback(() => reject(err));
            });
        });
      });
    });
  }

  // Code to update the recipe in the database
  update(id) {
    return new Promise((resolve, reject) => {
      const values = Object.entries(this)
        .filter(([key, value]) => value && key !== "ingredients")
        .map(([key, value]) => `${key} = ${value}`)
        .join(", ");

      const q = `UPDATE recipe SET ${values} WHERE id = ?`;
      db.query(q, [id], (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  // Code to delete the recipe from the database
  static remove(id) {
    return new Promise((resolve, reject) => {
      const q = "DELETE FROM recipe WHERE id = ?";
      db.query(q, [id], (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }
}

export default Recipe;
