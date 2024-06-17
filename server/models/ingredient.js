import pool from "./connection.js";

class Ingredient {
  constructor({ name, amt }) {
    this.name = name;
    this.amt = amt;
  }

  // Fetch all the ingredients for a recipe
  static getAll(recipeId) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        const q =
          "SELECT ingredient_id,name,amt FROM ingredient WHERE recipe_id = ?";
        conn.query(q, [recipeId], (err, res, _) => {
          if (err) reject(err);
          resolve(res);
        });
        conn.release();
      });
    });
  }

  // Save all the ingredients of a recipe
  save(recipeId) {
    return new Promise((resolve, reject) => {
      const q = "INSERT into ingredient SET ?, recipe_id = ?";
      pool.getConnection((err, conn) => {
        conn.query(q, [this, recipeId], (err, res, _) => {
          if (err) reject(err);
          resolve(res);
        });
        conn.release();
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
      pool.getConnection((err, conn) => {
        conn.query(q, [recipeId], (err, res, _) => {
          if (err) reject(err);
          resolve(res);
        });
        conn.release();
      });
    });
  }
}

export default Ingredient;
