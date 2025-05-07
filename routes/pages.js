//RUTA A LAS PAGINAS
import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router();

//REDERIZA PAGINA DE REGISTRO
router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register",
        desc: "Register a new user",
    });
});

//RENDERIZA PAGINA DE INICIO DE SESION
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login",
        desc: "Inicia sesion",
    });
});

//RENDERIZA PAGINA DE PERFIL
router.get("/profile", isAuthenticated, (req, res) => {
    const user = req.session.username;
    res.render("profile", {user})
});
export default router;