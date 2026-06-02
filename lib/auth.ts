import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_only_hello";

/**
 * Hashing passwords before saving to MongoDB
 */
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12); // High cost factor for security
  return await bcrypt.hash(password, salt);
};

/**
 * Comparing entered password with hashed password in DB
 */
export const comparePasswords = async (password: string, hashed: string) => {
  return await bcrypt.compare(password, hashed);
};

/**
 * Generating a Secure Token for User Sessions
 */
export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d", // Token expires in 24 hours
  });
};

/**
 * Verifying the Token (Used in Middleware)
 */
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};