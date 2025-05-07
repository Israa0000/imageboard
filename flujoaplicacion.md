Inicio del servidor:
Se inicializa la base de datos y las asociaciones.
Se configuran las rutas y middlewares.

Registro de usuario:
El usuario accede a /register, completa el formulario y envía los datos.
La ruta POST /users guarda el usuario en la base de datos.

Inicio de sesión:
El usuario accede a /login, completa el formulario y envía los datos.
La ruta POST /auth/login verifica las credenciales y guarda la sesión.

Perfil del usuario:
El usuario autenticado accede a /profile y ve su información.