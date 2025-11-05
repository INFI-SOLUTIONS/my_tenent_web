import { Request, Response, NextFunction } from "express";
const jwt=require('jsonwebtoken')
interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    (req as any).user = decoded; // store user info in request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
