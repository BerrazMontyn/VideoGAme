const { getGenre } = require("../controllers/utilitis");
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let sendGenres = await getGenre();
    res.status(200).json(sendGenres);
  } catch (error) {
    res.status(404).send("Genre not found");
    console.log(error);
  }
});

module.exports = router;
