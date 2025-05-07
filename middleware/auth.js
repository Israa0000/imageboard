//Los middlewares son funciones que se ejecutan antes 
// de las rutas para manejar peticiones o respuestas.

//verifica si el usuario está autenticado

export const isAuthenticated = (req, res, next) => {
    if(req.session.userId){
        return next();
    }
    res.render("unauthorized.njk")
}

