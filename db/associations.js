//Relacion entre tablas
import { User } from '../models/user.js';
import { Board } from '../models/board.js';
import { Post } from '../models/post.js';
import { Comment } from '../models/comment.js';

// Definir asociaciones
// Un usuario puede tener muchos posts
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

//Un board puede tener muchos posts
Board.hasMany(Post, { foreignKey: 'boardId', as: 'posts' });
Post.belongsTo(Board, { foreignKey: 'boardId', as: 'board' });

//Un post puede tener muchos comentarios
//Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
//Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
