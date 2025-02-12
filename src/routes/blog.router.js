const express = require("express");
const validateRequest = require("../middlewares/validateRequest");
const authMiddleware = require("../middlewares/auth");
const blog = require("../controllers/blog.controller");
const { createBlogRules } = require("../validators/blog.validator");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109cb"
 *         title:
 *           type: string
 *           example: "Titulo del blog"
 *         subtitle:
 *           type: string
 *           example: "Subtitulo del blog"
 *         text:
 *           type: string
 *           example: "Contenido principal del blog"
 *         created_by:
 *           type: string
 *           example: "Este..."
 *         created_at:
 *            type: date
 *            example: "Fecha"
 */

/**
 * @swagger
 *
 * /blogs/create:
 *    post:
 *      summary: Crear un blog
 *      tags: [Blogs]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      responses:
 *        201:
 *          description: Blog creado con éxito
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Blog creado éxitosamente"
 *                  id:
 *                    type: string
 *                    example: "60d0fe4f5311236168a109cb"
 *        401:
 *          description: No se ha iniciado sesión
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Inicio de sesión requerido"
 *                  id:
 *                    type: string
 *                    example: "60d0fe4f5311236168a109cb"
 *        403:
 *          description: Permisos insuficientes
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "No tiene los permisos necesarios"
 *        500:
 *          description: Error interno del servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Error interno, por favor intenta más tarde"
 */
router.post(
  "/create",
  createBlogRules,
  validateRequest,
  authMiddleware(["Escritor", "Admin"]),
  blog.createBlog
);

module.exports = router;
