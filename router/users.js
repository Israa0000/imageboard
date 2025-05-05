import express from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get("/", async(req,res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    }
    catch(error){
        res.json(error);
    }
})

router.post("/register", async(req,res) => {
    console.log("has llaamado al /register");
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username: username,
        password: hashedPassword,
    })
    res.status(201).json(user);
})
/*
router.get("/table", async (req, res) => {
    try {
        const users = await User.findAll();
        res.render("usersTable", { users });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
        res.redirect("/users/table");
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
});*/

export default router;

