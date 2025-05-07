//RUTAS DE USUARIOS

import { User } from "../models/user.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

//DEVUELVE TODOS LOS USUARIOS Y SE RENDERERIZA EN TEST.NJK
router.get("/", async (req, res) => {
    const usersRaw = await User.findAll();
    const users = usersRaw.map((user) => {
        return {
            id: user.id,
            name: user.username,
            pass: user.password,
        };
    });
    console.log(users);
    res.render("test", {
        title: "Test de nunjucks",
        desc: "Probando mi motor de plantillas",
        users,
    });
});

//CREA UN NUEVO USUARIO Y CONTRSEÑA HASHED
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        password: hashedPassword,
    });
    res.status(201).redirect("/login");
});

export default router;