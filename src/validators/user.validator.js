const { check } = require("express-validator");

const createUserRules = [
  check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isAlpha()
    .withMessage("El nombre solo permite letras")
    .isLength({ min: 3 })
    .withMessage("El nombre debe de tener al menos 3 letras"),
  check("lastname")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isAlpha()
    .withMessage("El apellido solo permite letras")
    .isLength({ min: 3 })
    .withMessage("El apellido debe de tener al menos 3 letras"),
  check("email")
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .isEmail()
    .withMessage("dirección de correo inválida"),
  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isStrongPassword()
    .withMessage("La contraseña no cumple con el mínimo de seguridad"),
  check("rol")
    .notEmpty()
    .withMessage("El rol es obligatorio")
    .isIn(["Lector", "Escritor"])
    .withMessage("Rol inválido"),
];

module.exports = {
  createUserRules,
};
