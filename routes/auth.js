//RUTA DE AUTENTICACION

import express from "express";
import { authenticateUser } from "../models/auth.js"; 

const router = express.Router();

//AUTENTICACION DE USUARIO Y CONTRASEÑA
router.post("/login", async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await authenticateUser(username, password);
        // Si el usuario no existe o la contraseña es incorrecta, redirigir a la página de inicio de sesión
        if(!user){
            return res.status(401).redirect("/login")
        }
        // Si la autenticación es exitosa, guardar el ID del usuario en la sesión
        req.session.userId = user.id;
        req.session.username = user.username;
        res.redirect("/profile");
    } catch(error){
        console.error(error);
        res.json({ error: "Hubo un error al iniciar sesion"})
    }
});

router.get("/logout", (req, res) => {
    // Eliminar la sesión del usuario
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al cerrar sesión" });
        }
        res.redirect("/login");
    });
})

export default router;