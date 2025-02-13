# iInvestigacion 1

API con el objetivo de servir un sistema de blogs, donde se manejarán 3 tipos de usuarios.

**Lector:** Usuario con los permisos para únicamente leer blogs.

**Escritor:** Tendrá acceso para crear blogs

**Admin:** Tendrá las misma posibilidades que el escritor, con la diferencia que puede ver todos los usuarios registrados

Para manejar los roles, y por consecuencia la autenticación, se ha implementado `jwt` en los endpoints necesarios.

## Técnologías

- Express
- Mongoose
- Express-validator
- Swagger

# Instalación

> [!NOTE]
> Como gestor de paquetes, se ha utilizado `yarn`

``` bash
# Instalar dependencias
yarn install

# Levantar proyecto
yarn start
```

> [!IMPORTANT]
> Es necesario colocar las variables de entorno en el `.env`

Si tienes instalado openssl, puedes generar un el `JWT_SECRET` con:

``` bash
openssl rand -base64 32
```

### Documentación

Se ha realizado la respectiva documentación de todos los endpoints usando `Swagger`, el cual se podrá acceder mediante el siguiente enlace:

[Documentación](http://localhost:3000/api/docs/#/)

## Equipo

- David Ernesto Ramos Vásquez RV230544
- Melissa Vanina López Peña LP223029
- Vladimir Alexander Ayala Sánchez AS180120
- Bryan Rubén De Paz Rivera DR202095
- Oliver Alejandro Erazo Reyes ER231663