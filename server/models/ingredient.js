import db from "./connection.js";

class Ingredient {
  constructor({ name, amt }) {
    this.name = name;
    this.amt = amt;
  }

  // Fetch all the ingredients for a recipe
  static getAll(recipeId) {
    return new Promise((resolve, reject) => {
      const q =
        "SELECT ingredient_id,name,amt FROM ingredient WHERE recipe_id = ?";
      db.query(q, [recipeId], (err, res, fields) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  // Save all the ingredients of a recipe
  save(recipeId) {
    return new Promise((resolve, reject) => {
      const q = "INSERT into ingredient SET ?, recipe_id = ?";
      db.query(q, [this, recipeId], (err, res, fields) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  // Update a ingredient of a recipe
  update(recipeId) {
    return new Promise((resolve, reject) => {
      const values = [];
      for (const key in this) {
        if (this[key]) values.push(`${key} = '${this[key]}'`);
      }

      const q = `UPDATE ingredient SET ${values.join(
        ", ",
      )} WHERE recipe_id = ?`;
      db.query(q, [recipeId], (err, res, fields) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}

export default Ingredient;
