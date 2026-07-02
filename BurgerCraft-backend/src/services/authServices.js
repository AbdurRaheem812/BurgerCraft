import User from "../model/User.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";

export const signupServices = async (username, email, phoneNumber, password) => {
  const existingEmail = await User.findOne({ email });
  if (existingEmail) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ username, email, phoneNumber, password: hashedPassword });
  return { id: user._id, email: user.email, username: user.username, phoneNumber: user.phoneNumber };
}

export const loginServices = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return { token, user: { id: user._id, email: user.email, username: user.username, phoneNumber: user.phoneNumber } };
};