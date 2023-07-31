# AppFrontend

Aplicación **Frontend** para la resolución de la consigna de entrenamiento de nuevos recursos de **ODT**.
Para poder levantar el proyecto se necesita tener instalado antes **Angular CLI**, **NodeJS** y **npm**.

A continuación se indican las versiones que utilizaron para el desarrollo de la consigna:
- Angular CLI v16.1.3
- Node v18.16.1
- npm v9.7.2


## Pasos

1. Clonar el proyecto utilizando el comando `git clone` seguido de:
    - HTTP: `https://github.com/Lucho-Castagno/app-frontend.git`
    - SSH: `git@github.com:Lucho-Castagno/app-frontend.git`

2. Dentro de la carpeta del proyecto ya clonado, utilizamos el comando `npm install` para que instale todas las dependencias.

3. Luego podremos visualizar el proyecto en el navegador utilizando el comando `ng serve`.

4. El proyecto se visualizará en `http://localhost:4200/`


## Aclaraciones

Cabe destacar que la aplicación es un complemento del proyecto **app-backend** (https://github.com/Lucho-Castagno/app-backend) por lo que si no tenemos este mismo levantado no podrán ver más allá del "Iniciar Sesión"/"Registrarse". Esto es porque, este proyecto aplica `auth-guard` a las rutas del proyecto, por lo que solo podrán ingresar a la aplicación completa iniciando sesion con un usuario ya registrado en el sistema, es por esto que se necesita el otro proyecto, ya que es necesario el **Token** que el backend envía luego de iniciar sesión con éxito para poder ingresar a la app del frontend y poder hacer las consultas que sean necesarias para mostrar la información requerida.