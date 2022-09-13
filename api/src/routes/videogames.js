const { Router } = require("express");
const axios = require("axios");
const { getApiDb } = require("../controllers/utilitis");
const router = Router();
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let info = await getApiDb();
    if (!name) {
      res.status(200).send(info);
    } else {
      let videoG = info.filter(
        (vG) => vG.name.toLowerCase() === name.toLowerCase()
      );

      videoG.length
        ? res.status(200).send(videoG)
        : res.status(404).send("No se encontro el Video Game");
    }
  } catch (error) {
    console.log("ERROR EN RUTA GET A /videoGames", error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  //console.log("Sol El Id", id)

  try {
    const VgTotal = await getApiDb();
    if (id) {
      let vgId = VgTotal.find((v) => v.id == id);
      vgId
        ? res.status(200).send(vgId)
        : res.status(404).send("No se encontro ese id");
    }
  } catch (error) {
    console.log("ERROR EN RUTA id");
  }
});
router.post("/", async (req, res) => {
  try {
    const { name, description, released, rating, platforms, image, genres } =
      req.body;
    // if (
    //   !name ||
    //   !description ||
    //   !released ||
    //   !rating ||
    //   !platforms ||
    //   !image ||
    //   !genres
    // ) {
    //   res.status(404).send("");
    // }
    let videoGames = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      image,
    });
    let genreDb = await Genre.findAll({
      where: { name: genres },
    });
    videoGames.addGenre(genreDb);
    res.send(videoGames);
  } catch (error) {
    console.log("RUTA POOST", error);
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Videogame.destroy({
      where: { id },
    });
    res.send("Borrado.");
  } catch (error) {
    console.log("Rompo en el delete pa");
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const datos = req.body;
  try {
    let change = await Videogame.update(datos, { where: { id } });
    return res.send(change);
  } catch (error) {
    console.log("Te cambio los valores");
  }
});

function callme(value) {
  return function Mauro() {};
}
module.exports = router;
