const express = require("express");
const user = require("../controllers/user.controller");
const { createUserRules, loginRules } = require("../validators/user.validator");
const validateRequest = require("../middlewares/validateRequest");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109cb"
 *         name:
 *           type: string
 *           example: "Oliver"
 *         lastname:
 *           type: string
 *           example: "Erazo"
 *         email:
 *           type: string
 *           example: "example@example.net"
 *         role:
 *           type: string
 *           enum: [Lector, Escritor, Admin]
 *           example: "Lector"
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
 * /users/create:
 *   post:
 *     summary: Crear usuario
 *     security: []
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  example: "60d0fe4f5311236168a109cb"
 *                name:
 *                  type: string
 *                  example: "Nombre"
 *                lastname:
 *                  type: string
 *                  example: "Apellido"
 *                email:
 *                  type: string
 *                  example: "example@example.net"
 *                password:
 *                  type: string
 *                  example: "Password123!"
 *                role:
 *                  type: string
 *                  enum: [Lector, Escritor, Admin]
 *                  example: "Lector"
 *     responses:
 *       201:
 *         description: Crea un nuevo usuario y devuelve la confirmación de éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *             example:
 *               message: "Usuario creado exitosamente"
 *               user:
 *                 id: "60d0fe4f5311236168a109cb"
 *                 name: "Oliver"
 *       422:
 *         description: Error en la validación de los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *             example:
 *               errors:
 *                 - msg: "El nombre es obligatorio"
 *                   param: "name"
 *                   location: "body"
 *       500:
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
router.post("/create", createUserRules, validateRequest, user.createUser);

/**
 * @swagger
 * /users/login:
 *  post:
 *    summary: Iniciar sesión (Ambos usuarios)
 *    security: []
 *    tags: [Usuarios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                 type: string
 *                 example: "example@example.net"
 *              password:
 *                 type: string
 *                 example: "Password123!"
 *    responses:
 *      200:
 *        description: Sesión iniciada con éxito
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Sesión iniciada con éxito"
 *                token:
 *                  type: string
 *      401:
 *        description: El nombre de usuario o la contraseña son incorrectos
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Usuario o contraseña incorrectos"
 *      422:
 *         description: Error en la validación de los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *             example:
 *               errors:
 *                 - msg: "El nombre es obligatorio"
 *                   param: "name"
 *                   location: "body"
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
router.post("/login", loginRules, validateRequest, user.login);

/**
 * @swagger
 * /users/list:
 *  get:
 *    summary: Lista todos los usuarios
 *    tags: [Usuarios]
 *    responses:
 *      200:
 *        description: Devuelve todos los usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/User'
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
router.get("/list", authMiddleware("Admin"), user.getUsers);

module.exports = router;
