// filepath: /imageboard/db/init.js
import { sequelize } from './sequelize.js';
import { User } from '../models/user.js';
import { Board } from '../models/board.js';
import { Post } from '../models/post.js';
import { Comment } from '../models/comment.js';
import './associations.js'; // Asegúrate de que las asociaciones estén definidas

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Esto recreará las tablas
        console.log('Base de datos sincronizada correctamente.');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
};

syncDatabase();