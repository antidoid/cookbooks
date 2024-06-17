import pool from "./connection.js";
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
      pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM recipe", (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    });
  }

  // Code to get a recipe by ID from the database
  static getById(id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        const q = "SELECT * FROM recipe WHERE id = ?";
        conn.query(q, [id], (err, res) => {
          if (err) return reject(err);
          const [data] = res;
          resolve(data);
        });
        conn.release();
      });
    });
  }

  // Code to save a recipe to the database
  save() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        conn.beginTransaction((err) => {
          if (err) return reject(err);

          const q = "INSERT INTO recipe SET ?";
          const { ingredients, ...values } = this;

          conn.query(q, [values], (err, result) => {
            if (err) return conn.rollback(() => reject(err));

            const ingredientPromises = [];
            ingredients.forEach(async (ingredient) => {
              const ingredientObj = new Ingredient(ingredient);
              ingredientPromises.push(
                await new Promise((resolve, reject) => {
                  ingredientObj
                    .save(result.insertId)
                    .then(resolve)
                    .catch(reject);
                }),
              );
            });

            Promise.all(ingredientPromises)
              .then(() => {
                conn.commit((err) => {
                  if (err) return conn.rollback(() => reject(err));
                  resolve();
                });
              })
              .catch((err) => {
                return conn.rollback(() => reject(err));
              });
            conn.release();
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
        .map(([key, value]) => `${key} = '${value}'`)
        .join(", ");

      const q = `UPDATE recipe SET ${values} WHERE id = ?`;
      pool.getConnection((err, conn) => {
        conn.query(q, [id], (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
        conn.release();
      });
    });
  }

  // Code to delete the recipe from the database
  static remove(id) {
    return new Promise((resolve, reject) => {
      const q = "DELETE FROM recipe WHERE id = ?";
      pool.getConnection((err, conn) => {
        conn.query(q, [id], (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
        conn.release();
      });
    });
  }
}

export default Recipe;
