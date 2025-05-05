import express from 'express';
import nunjucks from 'nunjucks';
import { User } from './models/user.js';
import { loggerBasic, loggerCustom } from './middleware/log.js';  
import userRouter from './router/users.js';
import pagesRouter from './router/pages.js';
import authRouter from './router/auth.js';
import session from 'express-session';
import SQLitestore from 'connect-sqlite3';

// Inicializa app antes de usarla
const app = express(); 
const port = 3000;

// Objeto SQLiteStore para guardar la sesión
const SQLiteStoreSession = SQLitestore(session);

// Configuración de la store
const sessionStore = new SQLiteStoreSession({
  db: 'sessions.sqlite',
  dir: './db',
});

const sessionConfig = {
  store: sessionStore,
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 día
  }
};

app.use(session(sessionConfig)); // Configura la sesión

app.use(loggerCustom); // Logger personalizado

const env = nunjucks.configure('views', { 
  autoescape: true,
  express: app // Integra nunjucks con express
});

app.use(express.json()); // Permite recibir JSON
app.use(express.urlencoded({ extended: true })); // Permite recibir formularios

app.set('view engine', 'njk'); // Configura el motor de plantillas nunjucks

// Define las rutas después de inicializar app
app.use("/auth", authRouter); // Ruta de autenticación
app.use("/", pagesRouter); // Ruta de páginas
app.use("/users", userRouter); // Ruta de usuarios

app.get('/', async (req, res) => {
  const usersRaw = await User.findAll();
  const users = usersRaw.map(user => {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
    };
  });

  console.log(users);
  res.render('test', { 
    title: 'Test de nunjucks',
    desc: "Prueba de nunjucks",
    users
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});