import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.send(401);
    }

    const parts = authorization.split(" ");

    const [schema, token] = parts;

    if (parts.length !== 2) {
      res.send(401);
    }
    if (schema !== "Bearer") {
      res.send(401);
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        res.status(401).send({ message: "Invalid Token" });
      }
      console.log(decoded);

      const user = await userService.findByIdService(decoded.id);
      if (!user || !user.id) {
        res.status(401).send({ message: "Invalid token" });
      }
      req.userId = user.id;
      return next();
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
