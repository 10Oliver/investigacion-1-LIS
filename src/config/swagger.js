const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API RESTful para blogs",
      version: "1.0.0",
      description:
        "API diseñada para una aplicación de blogs con diferentes tipos de usuario, esta pensada como ejemplo para la investigación 1 de LIS",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  console.log("Swagger Docs disponible en http://localhost:3000/api/docs");
};

module.exports = setupSwagger;
