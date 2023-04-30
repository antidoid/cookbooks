import db from "./connection.js";
import Ingredient from "../models/ingredient.js";

class Recipe {
  constructor({
    name,
    desc,
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
    this.desc = desc;
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
      db.query("SELECT * FROM recipe", (err, res, fields) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  // Code to get a recipe by ID from the database
  static getById(id) {
    return new Promise((resolve, reject) => {
      const q = "SELECT * FROM recipe WHERE id = ?";
      db.query(q, [id], (err, res, fields) => {
        if (err) reject(err);
        const [data] = res;
        resolve(data);
      });
    });
  }

  // Code to save a recipe to the database
  save() {
    return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) reject(err);

        conn.beginTransaction((err) => {
          if (err) {
            conn.release();
            reject(err);
          }

          const q = "INSERT INTO recipe SET ?";
          const { ingredients, ...values } = this;
          conn.query(q, [values], (err, res, fields) => {
            if (err) {
              conn.rollback(() => {
                conn.release();
                reject(err);
              });
            }

            const ingredientPromises = [];
            ingredients.forEach(async (ingredient) => {
              const ingredientObj = new Ingredient(ingredient);
              ingredientPromises.push(
                await new Promise((resolve, reject) => {
                  ingredientObj.save(res.insertId).then(resolve).catch(reject);
                })
              );
            });

            Promise.all(ingredientPromises)
              .then(() => {
                conn.commit((err) => {
                  if (err) {
                    conn.rollback(() => {
                      conn.release();
                      reject(err);
                    });
                  }
                  conn.release();
                  resolve();
                });
              })
              .catch((err) => {
                conn.rollback(() => {
                  conn.release();
                  reject(err);
                });
              });
          });
        });
      });
    });
  }

  // Code to update the recipe in the database
  update(id) {
    return new Promise((resolve, reject) => {
      const values = [];
      for (const key in this) {
        // A user is not allowed to modify the ingredients once its created
        if (this[key] && key !== "ingredients")
          values.push(`${key} = '${this[key]}'`);
      }

      const q = `UPDATE recipe SET ${values.join(", ")} WHERE id = ?`;
      db.query(q, [id], (err, res, fileds) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  // Code to delete the recipe from the database
  static delete(id) {
    return new Promise((resolve, reject) => {
      const q = "DELETE FROM recipe WHERE id = ?";
      db.query(q, [id], (err, res, fields) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}

export default Recipe;
