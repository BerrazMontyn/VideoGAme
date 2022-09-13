import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getGenre,
  filterByGenres,
  filterCreated,
  orderByName,
  orderByRating,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SerchBar from "./SerchBar";
import style from "../Css.module/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames); // Me traigo del state global de redux
  const allgenres = useSelector((state) => state.genres);
  const [currentPage, setCurrentPage] = useState(1); //Seteo en 1, para que la pagina inicial siempre sea 1.
  const [videoGamePerPage, setVideoGamePerPage] = useState(15); //seteo 15 por la cantidad de videojuegos que se solicita por pagina.
  const indexOfLastVideogame = currentPage * videoGamePerPage; //esto me da el indice del ultimo videojuego que tengo en la pagina. //15
  const indexOfFirstVideogame = indexOfLastVideogame - videoGamePerPage; // esto me da el indice del primer videojuego de la pagina. //0
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
  const [sort, setSort] = useState();
  const [sortRating, setSortRating] = useState();

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }
  function handleFilterGenres(e) {
    dispatch(filterByGenres(e.target.value));
    setCurrentPage(1);
  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value)); //e.target.value es lo que llega del select , el payload es en la accion
    setCurrentPage(1);
  }
  function handleOrder(e) {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setSort(e.target.value);
  }
  function handleOrderRating(e) {
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setSortRating(`ratin ${e.target.value}`);
  }
  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenre());
  }, [dispatch]);

  return (
    <div className={style.fondo}>
      <button className={style.btnCrea}>
        <Link to="/videogames">Crear Video Juego</Link>
      </button>
      <h1 className={style.titulo}>Fichines</h1>
      <button
        className={style.btnCargaPersonajes}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar Video Juegos.
      </button>
      <div className={style.sort}>
        <select onChange={handleOrder}>
          <option value="Order" disabled>
            Order
          </option>
          <option value="Asc">A - Z</option>
          <option value="Desc">Z - A</option>
        </select>
        <select onChange={handleOrderRating}>
          <option value="Order" disabled>
            Rating
          </option>
          <option value="hight">High</option>
          <option value="low">Low</option>
        </select>

        <div onChange={(e) => handleFilterGenres(e)}>
          <select>
            <option className="options" value="All">
              All Genres
            </option>
            {allgenres?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>

        <select onChange={handleFilterCreated}>
          <option disabled>Origin</option>
          <option value="All">All</option>
          <option value="created">Created </option>
          <option value="api">Api</option>
        </select>
        <SerchBar />
        <Paginado
          videoGamePerPage={videoGamePerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
          currentPage={currentPage}
        />
        {currentVideogames?.map((game) => {
          return (
            <div className={style.formaCard}>
              <Card
                key={game.id}
                id={game.id}
                name={game.name}
                image={game.image ? game.image : game.img}
                rating={game.rating}
                genres={game.genres}
                // createdInDb={game.createdInDb}
              />
            </div>
          );
        })}

        <br></br>
        <Paginado
          videoGamePerPage={videoGamePerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
