import { Request, Response } from "express";
import User from "../../../config/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  async registerUser(req: Request, res: Response) {
    if (req.body == undefined) {
      return res.status(404).json({
        message: "No data provided",
      });
    }
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        message: "Please provide username,password and email",
      });
    }
    await User.create({
      email,
      password: await bcrypt.hash(password, 10),
      username,
    });
    res.status(201).json({
      message: "User registered successfully",
    });
  }
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }
    const userExist = await User.findOne({
      where: {
        email,
      },
    });
    if (!userExist) {
      return res.status(404).json({
        message: "No user found with that email",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        message: "Invalid email or password",
      });
    }
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }
    const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).json({
      message: "User loggedIn successfully",
      data: token,
    });
  }
}

const authC = new AuthController();
export default authC;
