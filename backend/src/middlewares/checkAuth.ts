import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

interface JwtDecoded extends JwtPayload {
  userId: string;
}

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT Secret not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtDecoded;

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default checkAuth;
