import { Request } from "express";
import jwt from "jsonwebtoken";

// Define the structure of decoded token
interface DecodedToken {
  userId: string;
  email: string;
}

// Extend the default Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken; // Define the user property structure
    }
  }
}
