import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./firebaseAdminCred.json" assert { type: "json" };

export const isLoggedIn = (req, res, next) => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const token = req.headers?.Authorization.split(" ");
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
