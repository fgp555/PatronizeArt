import jwt from "jsonwebtoken";
import fetch from "node-fetch";

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


// Función para verificar el token de acceso
export const verifyAccessToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // Se espera que el token venga en el header Authorization
  try {
    // Paso 1: Obtener la clave pública de Google
    const publicKeyResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/certs"
    );
    const publicKeyData = await publicKeyResponse.json();
    const publicKey = publicKeyData.keys[0].x5c[0];

    // Paso 2: Verificar la firma del token
    const verifiedToken = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });

    // Paso 3: Verificar la validez del token
    const currentTime = Math.floor(Date.now() / 1000);
    if (verifiedToken.exp <= currentTime) {
      return res.status(401).json({ error: "Token expirado" });
    }

    // Paso 4: Comprobar el alcance del token
    if (!verifiedToken.scope.includes("email")) {
      return res
        .status(401)
        .json({ error: "El token no tiene el alcance requerido" });
    }

    // Si llegamos hasta aquí, el token es válido
    req.user = verifiedToken; // Agregamos el usuario decodificado al objeto de solicitud
    next(); // Pasamos al siguiente middleware o controlador
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    return res.status(401).json({ error: "Token inválido" });
  }
};
