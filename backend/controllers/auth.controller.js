import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { creataAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { OAuth2Client }  from 'google-auth-library'

const CLIENT_ID =
"413068305228-4prm49plvd4d3csv1pf3cp3lvd4mlu80.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (userFound) return res.status(400).json(["the email is already in use"]);
    const passhash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passhash,
    });

    const userSaved = await newUser.save();
    const tokenAcces = await creataAccesToken({ id: userSaved._id });

    res.cookie("token", tokenAcces);
    res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(["User not found"]);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json(["Incorrect Password"]);

    const tokenAcces = await creataAccesToken({ id: userFound._id });

    res.cookie("token", tokenAcces);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const loginGoogle = async (req,res)=>{
  console.log(req.body);
  const { tokenId, profileObj:{imageUrl,email,givenName, googleId}} = req.body;
    
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID, // Reemplaza CLIENT_ID con tu ID de cliente de Google
    });

    const payload = ticket.getPayload();
    // const userId = payload['sub'];
    // const userEmail = payload['email'];
    // const image = payload['picture'];

    const existingUser = await User.findOne({email });
    if (!existingUser) {
      const newUser = new User({ username:givenName, email:email, password:'google' });
      await newUser.save();
    }
    // Respondemos al cliente con éxito
    res.status(200).json({ success: true, googleId, email,imageUrl,givenName });
  } catch (error) {
    console.error('Error de autenticación con Google:', error);
    res.status(401).json({ error: 'Error de autenticación con Google' });
  }
}
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updateAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
