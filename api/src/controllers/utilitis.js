const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY2 } = process.env;
const { API_KEY } = process.env;

const apiInfo = async () => {
  // let url = `https://api.rawg.io/api/games?key=${API_KEY}&page=1`;
  // let videogames = [];
  // try {
  //   for (let i = 0; i < 5; i++) {
  //     const result = await axios.get(url);
  //     result.data.results.map((videogame) => {
  //       videogames.push({
  //         id: videogame.id,
  //         name: videogame.name,
  //         img: videogame.background_image,
  //         rating: videogame.rating,
  //         platforms: videogame.platforms.map((e) => e.platforms.name),
  //         released: videogame.released,
  //       });
  //     });
  //     url = result.data.next;
  //   }
  //   return videogames;
  // } catch (error) {
  //   console.log(error);
  // }

  try {
    let url1 = await axios.get(`${API_KEY2}`);
    let url2 = await axios.get(url1.data.next);
    let url3 = await axios.get(url2.data.next);
    let url4 = await axios.get(url3.data.next);
    let url5 = await axios.get(url4.data.next);

    let infoTotalApi = [
      ...url1.data.results,
      ...url2.data.results,
      ...url3.data.results,
      ...url4.data.results,
      ...url5.data.results,
    ];

    let formateo = infoTotalApi.map((videogame) => {
      return {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description_raw,
        released: videogame.released,
        rating: videogame.rating,
        platforms: videogame.platforms?.map((p) => p.platform.name),
        image: videogame.background_image,
        genres: videogame.genres.map((g) => g.name),
      };
    });

    return formateo;
  } catch (err) {
    console.error("Este es el; error de infoApi?", err);
  }
};

const dataBaseGames = async () => {
  try {
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log("Este error es de DB", error);
  }
};
const getApiDb = async () => {
  try {
    const videogame = await apiInfo();
    const allDbs = await dataBaseGames();

    return [...videogame, ...allDbs];
  } catch (err) {
    console.log("ERROR  EN APIDB", err);
  }
};
const getGenre = async () => {
  try {
    const result = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genresApi = result.data.results.map((g) => g.name);

    genresApi.forEach((g) =>
      Genre.findOrCreate({
        where: { name: g },
      })
    );
    const allGenres = await Genre.findAll();

    return allGenres;
  } catch (error) {
    console.error("EROR EN GETGENRE", error);
  }
};

module.exports = {
  apiInfo,
  dataBaseGames,
  getApiDb,
  getGenre,
};
