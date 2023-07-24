import { getAuth } from "firebase-admin/auth";

export const isLoggedIn = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ");
  if (!token || !token[1])
    return res.status(401).send({ message: "Unauthorized" });

  getAuth()
    .verifyIdToken(token[1])
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      return res.status(401).send({ message: "Unauthorized" });
    });
};
