import { sequelize } from './sequelize.js';
import { User } from '../models/user.js';
import { Board } from '../models/board.js';

const initializeDB = async () => { 
    try {
        await sequelize.sync({ force: true }); // Sincroniza todos los modelos
        console.log("Base de datos inicializada correctamente.");
    } catch (error) {
        console.error("Error initializing the database:", error);
    }
};

initializeDB();