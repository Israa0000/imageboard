//RUTA A LAS PAGINAS
import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { Board } from '../models/board.js';
import { Post } from '../models/post.js';
import { User } from '../models/user.js';
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
router.get("/profile", isAuthenticated,async (req, res) => {
    const user = req.session.username;
    const boardsRaw = await Board.findAll();
    const boards = boardsRaw.map((board) => {
        return {
            id: board.id,
            name: board.name,
        };
    });
    console.log(boards);
    res.render("profile", {user, boards})
});

router.get("/boards/:id", isAuthenticated, async (req, res) => {
    const id = req.params.id;
    const board = await Board.findByPk(id);
    const posts = await Post.findAll({
        where: {
            boardId: id,
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["username"],
            },
        ],
        order: [["updatedAt", "DESC"]],
    })
    const boards = await Board.findAll();
    console.log(boards)
    console.log(posts)
    res.render("board", {board, posts, boards})
})
export default router;