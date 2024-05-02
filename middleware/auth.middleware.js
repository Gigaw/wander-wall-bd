import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

export default function authMiddleware(roleName) {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Not authorized" });
      }

      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      if (roleName && roleName !== decoded.roleName) {
        console.log(roleName, user.roleName);
        return res.status(401).json({ message: "Не достаточно прав" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: "Not authorized" });
    }
  };
}
