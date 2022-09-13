const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const videogames = require("./videogames");
const genre = require("./genre");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter)
router.use("/genre", genre);
router.use("/videogames", videogames);

module.exports = router;
