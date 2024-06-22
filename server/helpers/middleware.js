import app from "./firebase.js";
import { getAuth } from "firebase-admin/auth";
import Recipe from "../models/recipe.js";

export const isLoggedIn = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ");
  if (!token || !token[1])
    return res.status(401).send({ message: "Unauthorized" });

  getAuth(app)
    .verifyIdToken(token[1])
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      return res.status(401).send({ message: "Unauthorized" });
    });
};

export const isRecipeOwner = async (req, res, next) => {
  const uid = req.headers.user;
  // Check if the user owns the recipe
  const recipeid = req.params.id;

  const ownerId = await Recipe.getRecipeOwner(recipeid);
  console.log(ownerId);
  console.log(uid);

  if (ownerId == uid) next();
  else return res.status(401).send({ message: "Unauthorized" });
};
