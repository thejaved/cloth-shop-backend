import { Request, Response } from "express";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ name, email, password });

    await user.save();

    res.status(201).json({ msg: "User registered" });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
