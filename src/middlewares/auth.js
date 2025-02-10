const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Inicio de sesión requerido" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (requiredRole && decoded.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "No tiene los permisos necesarios" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido" });
    }
  };
};

module.exports = authMiddleware;
