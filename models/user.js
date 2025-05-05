import { Sequelize } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: "users",
});