import express from "express";
import { authenticateUser } from "../models/auth.js"; 

const router = express.Router();

router.get("/profile", (req, res) => {
    if (!req.session.userId) {
        // Si no hay sesión activa, redirige a /login
        return res.redirect("/auth/login");
    }

    // Renderiza la página de perfil
    res.render("profile", {
        username: req.session.username,
    });
});

router.post("/login", async (req, res) => {
    try{
    const { username, password } = req.body;
    const user = await authenticateUser(username, password);
    if (!user) {
        return res.status(401).redirect("/login");
    }
    res.session.userId = user.id;
    req.session.username = user.username;
    res.redirect("/profile");
}
    catch(error){
        console.error("Error during login:", error);
        res.json({ error: "Error during login" });
    }

});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).json({ error: "Error al cerrar sesión" });
        }
        res.redirect("/auth/login");
    });
});

export default router;