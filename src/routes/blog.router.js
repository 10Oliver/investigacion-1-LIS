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
 *         title:
 *           type: string
 *           example: "Titulo del blog"
 *         subtitle:
 *           type: string
 *           example: "Subtitulo del blog"
 *         text:
 *           type: string
 *           example: "Contenido principal del blog"
 *     BlogResponse:
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
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *            type: string
 *            format: date-time
 *            example: "2025-02-12T08:55:29Z"
 *         updatedAt:
 *            type: string
 *            format: date-time
 *            example: "2025-02-12T08:55:29Z"
 *         deletedAt:
 *            type: string
 *            format: date-time
 *            example: null
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

/**
 * @swagger
 * /blogs/list:
 *  get:
 *    summary: Lista todos los blogs
 *    tags: [Blogs]
 *    responses:
 *      200:
 *        description: Todos los blogs
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/BlogResponse'
 *      401:
 *        description: No se ha iniciado sesión
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Inicio de sesión requerido"
 *      403:
 *        description: Permisos insuficientes
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "No tiene los permisos necesarios"
 *      500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Error interno, por favor intenta más tarde"
 */

router.get(
  "/list",
  authMiddleware(["Escritor", "Admin", "Lector"]),
  blog.listBlog
);

/**
 * @swagger
 * /blogs/find/{id}:
 *  get:
 *    summary: Muestra un único blog a base de su id
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID del blog a mostrar
 *    responses:
 *      200:
 *        description: Lista el blog solicitado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                blog:
 *                  $ref: '#/components/schemas/BlogResponse'
 *
 *      401:
 *        description: No se ha iniciado sesión
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Inicio de sesión requerido"
 *      403:
 *        description: Permisos insuficientes
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "No tiene los permisos necesarios"
 *      500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Error interno, por favor intenta más tarde"
 */

router.get(
  "/find/:id",
  authMiddleware(["Escritor", "Admin", "Lector"]),
  blog.findBlog
);

/**
 * @swagger
 * /blogs/update/{id}:
 *    put:
 *      summary: Actualiza los datos de un blog
 *      tags: [Blogs]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: ID del blog a actualizar
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Blog'
 *      responses:
 *        200:
 *          description: Blog creado con éxito
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Blog actualizado con éxito"
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
 *        404:
 *          description: No se ha encontrado el blog a actualizar
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Blog no encontrado"
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

router.put(
  "/update/:id",
  createBlogRules,
  validateRequest,
  authMiddleware(["Admin", "Escritor"]),
  blog.updateBlog
);

/**
 * @swagger
 * /blogs/delete/{id}:
 *    delete:
 *      summary: Elimina un blog (Lógicamente)
 *      tags: [Blogs]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: ID del blog a eliminar
 *      responses:
 *        204:
 *          description: Blog eliminado con éxito
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
 *        404:
 *          description: No se ha encontrado el blog a eliminar
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Blog no encontrado"
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
router.delete(
  "/delete/:id",
  authMiddleware(["Admin", "Escritor"]),
  blog.deleteBlog
);
module.exports = router;
