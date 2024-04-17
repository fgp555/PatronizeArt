import jwt from "jsonwebtoken";

import { TOKEN_SECRET } from "../config.js";

export const authRequeried = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token)
    return res.status(401).json({ message: "No token, authorized denied" });
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid Token" });
    console.log(user);
    req.user = user;
    next();
  });
};
