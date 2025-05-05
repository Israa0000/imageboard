import { User } from "../models/user.js";
import bcrypt from "bcrypt";

const populateUsers = async () => {
    const users = ["admin", "user1", "user2"];
    const password = "12345678";

    for (const username of users) {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Busca si el usuario ya existe
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            // Si el usuario existe, actualiza su contraseña
            await existingUser.update({ password: hashedPassword });
            console.log(`Contraseña actualizada para el usuario: ${username}`);
        } else {
            // Si el usuario no existe, créalo
            await User.create({
                username,
                password: hashedPassword,
            });
            console.log(`Usuario creado: ${username}`);
        }
    }
};

populateUsers();