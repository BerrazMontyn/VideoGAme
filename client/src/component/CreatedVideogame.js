import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenre, getVideogames } from "../actions";
import { Link, useHistory } from "react-router-dom";
import style from "../Css.module/Create.module.css";

function CreatedVideogame() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const allVideogames = useSelector((state) => state.allVideogames);

  //   const allVidegames = useSelector((state) => state.videogames);
  // const [error, setError] = useState({});
  // const [errorBtn, setErrorBtn] = useState(
  //   Object.values(error).length !== 0 ? true : false
  // );

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenre());
    dispatch(getVideogames());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value, // setea el valor del target.
    });
  }

  function handleSelectGenres(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
      // ? input.genres.includes(e.target.value)
      // : input.genres,
    });
  }

  function handleSelectPlatforms(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
      // ? input.platforms.includes(e.target.value)
      // : input.platforms,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.name.trim()) {
      return alert("Necesita un nombre");
    } else if (
      allVideogames.find(
        (e) =>
          e.name.toLowerCase().trim() === input.name.toLocaleLowerCase().trim()
      )
    ) {
      return alert(`El nombre ${input.name} ya existe`);
    } else if (input.description.trim() === "") {
      return alert("Se necesita una descriicion");
    } else if (input.released.trim() === "") {
      return alert("Se requiere fecha");
    } else if (input.released < "1960 - 08- 14") {
      return alert("La fecha no puede ser inferior a 1960 - 08- 14");
    } else if (input.rating === "" || input.rating < 1 || input.rating > 6) {
      return alert("Debe estar entre 1 y 6");
    } else if (input.genres.length === 0) {
      return alert("Seleccione uno o más géneros");
    } else if (input.platforms.length === 0) {
      return alert("Seleccione uno o más plataformas");
    } else {
      dispatch(postVideogame(input));
      alert("Se ha creado un nuevo Video Game");
      setInput({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
      history.push("/home");
    }
  }
  // const handleDeleteGenres = (e) => {
  //   setInput({
  //     ...input,
  //     genres: input.genres.filter((el) => el !== e),
  //   });
  // };
  // const handleDeletePlatforms = (e) => {
  //   setInput({
  //     ...input,
  //     platforms: input.platforms.filter((el) => el !== e),
  //   });
  // };

  return (
    <div className={style.fondoVGCreate}>
      <h2 className={style.tituloCreate}>Create your Video Game</h2>
      <form className="createVideoG" onSubmit={handleSubmit}>
        <div className={style.imput}>
          <label className={style.label}>Name:</label>
          <input
            class="text-input"
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className={style.imput}>
          <label className={style.label}>Image:</label>
          <input
            className="input"
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
        </div>
        <div className={style.imput}>
          <label className={style.label}>Released: </label>
          <input
            class="input"
            type="date"
            value={input.released}
            name="released"
            onChange={handleChange}
          />
        </div>
        <div className={style.imput}>
          <label className={style.label}>Rating:</label>
          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div className={style.imput}>
          <label className={style.label}>Description</label>
          <textarea
            type="text"
            value={input.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className={style.imput}>
          <label className={style.label}>Genres</label>
          <select onChange={handleSelectGenres}>
            {genres?.map((e) => (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <ul>
            {input.genres.map((e) => (
              <li>
                <div>{e + ""}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.imput}>
          <label className={style.label}>Platforms</label>
          <select onChange={handleSelectPlatforms}>
            {platforms?.map((e) => (
              <option value={e} key={e.id}>
                {e}
              </option>
            ))}
          </select>
          <ul>
            {input.platforms.map((e) => (
              <li>
                <div>{e + ""}</div>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Create Video Game</button>
        <br></br>
        <br></br>
        <div>
          <Link to="/home">
            <button className={style.btnBackHome}>Go Back Home </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default CreatedVideogame;
