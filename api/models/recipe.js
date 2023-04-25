import db from "./connection.js";

class Recipe {
  constructor({
    name,
    desc,
    preparetime,
    serves,
    difficulty,
    recipetype,
    instruction,
    videolink,
    imagelink,
  }) {
    this.name = name;
    this.desc = desc;
    this.preparetime = preparetime;
    this.serves = serves;
    this.difficulty = difficulty;
    this.recipetype = recipetype;
    this.instruction = instruction;
    this.videolink = videolink;
    this.imagelink = imagelink;
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

  // Code to save the recipe to the database
  save() {
    return new Promise((resolve, reject) => {
      const q = "INSERT INTO recipe SET ?";
      db.query(q, [this], (err, res, fields) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  // Code to update the recipe in the database
  update(id) {
    return new Promise((resolve, reject) => {
      const values = [];
      for (const key in this) {
        if (this[key]) values.push(`${key} = '${this[key]}'`);
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
