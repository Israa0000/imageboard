import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite", //Especifica que se utilizara SQLite como base de datos
    storage: "db/database.sqlite", // localizacion de la base de datos
    logging: false, //  Desactiva el registro de las consultas SQL en la consola. 
})

