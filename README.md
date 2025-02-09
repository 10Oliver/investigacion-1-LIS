# investigacion 1

API con el objetivo de servir un sistema de blogs, donde se manejarán dos tipos de usuarios.

**Lector:** Usuario con los permisos para únicamente leer blogs.

**Escritor:** Tendrá acceso para crear blogs

Para manejar los roles, y por consecuencia la autenticación, se ha implementado `jwt` en los endpoints necesarios.

## Técnologías

- Express
- Mongoose
- Express-validator
- Swagger

# Instalación

``` bash
# Instalar dependencias
yarn install

# Levantar proyecto
yarn start
```

> [!IMPORTANT]
> Es necesario colocar las variables de entorno en el `.env`

## Equipo

- David Ernesto Ramos Vásquez RV230544
- Melissa Vanina López Peña LP223029
- Vladimir Alexander Ayala Sánchez AS180120
- Bryan Rubén De Paz Rivera DR202095
- Oliver Alejandro Erazo Reyes ER231663

> [!NOTE]
> Como gestor de paquetes, se ha utilizado `yarn`