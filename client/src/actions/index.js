import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRE = "GET_GENRE";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const GET_NAME_VIDEOGAMES = "GET_NAME_VIDEOGAMES";
export const POST_VIDEOGAME = "CREATE_VIDEOGAME";

export const getVideogames = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("http://localhost:3001/videogames");
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: json.data,
      });
    } catch (error) {
      console.log("ERROR DE ACTION GETALL", error);
    }
  };
};

export const getGenre = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("http://localhost:3001/genre");
      dispatch({
        type: GET_GENRE,
        payload: json.data,
      });
    } catch (error) {
      console.log("HAY ERROR EN LA ACTION, GETGENRE", error);
    }
  };
};

export const filterByGenres = (payload) => {
  return {
    type: FILTER_BY_GENRES,
    payload,
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const jsonD = await axios.get(`http://localhost:3001/videogames/${id}`);
      console.log(jsonD);

      if (jsonD.data.id.length > 10) {
        let videojuego = jsonD.data;
        videojuego.genres = videojuego.genres.map(({ name }) => name); //piso la variable videojuegos y la convierto en un array.

        return dispatch({
          type: GET_DETAIL,
          payload: videojuego,
        });
      } else {
        dispatch({
          type: GET_DETAIL,
          payload: jsonD.data,
        });
      }
    } catch (error) {
      console.log("EROR EN LA RUTA DETAIL", error);
    }
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByRating = (payload) => {
  return {
    type: ORDER_BY_RATING,
    payload,
  };
};

export const getNameVideogames = (name) => {
  return async (dispatch) => {
    try {
      const jsonN = await axios.get(
        "http://localhost:3001/videogames?name=" + name
      );
      return dispatch({
        type: GET_NAME_VIDEOGAMES,
        payload: jsonN.data,
      });
    } catch (error) {
      console.log("ERROR EN GETNAME", error);
    }
  };
};

export const postVideogame = (payload) => {
  return async () => {
    try {
      const jsonPost = await axios.post(
        "http://localhost:3001/videogames",
        payload
      );
      return jsonPost;
    } catch (error) {
      console.log("ERROR EN CREATEVIDEOGAME", error);
    }
  };
};
