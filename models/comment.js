// filepath: /imageboard/models/comment.js
import { Sequelize } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

export const Comment = sequelize.define('Comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'comments',
});