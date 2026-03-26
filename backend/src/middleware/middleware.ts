import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../config/models/userModel";
import { IExtendedRequest } from "./type";

class Middleware {
  static async isLoggedIn(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          message: "Please provide token",
        });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {
        id: string;
      };
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
      };

      next();
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default Middleware;
