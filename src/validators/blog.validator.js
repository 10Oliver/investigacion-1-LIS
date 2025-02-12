const { check } = require("express-validator");

const createBlogRules = [
  check("title")
    .notEmpty()
    .withMessage("El titulo es requerido")
    .isAlphanumeric("es-ES", { ignore: " " })
    .withMessage("Solo se permiten letras y números en el titulo"),
  check("subtitle")
    .notEmpty()
    .withMessage("El subtitulo es requerido")
    .isAlphanumeric("es-ES", { ignore: " " })
    .withMessage("Solo se permiten letras y números en el subtitulo"),
  check("text")
    .notEmpty()
    .withMessage("El texto del blog es requerido")
    .isLength({ min: 5, max: 2000 })
    .withMessage(
      "El texto debe de contener entre 5 a 2000 caracteres de longitud"
    ),
];

module.exports = {
  createBlogRules,
};
