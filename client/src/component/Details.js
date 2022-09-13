import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../actions";

function Details() {
  const dispatch = useDispatch();
  const params = useParams();
  const myVideogame = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetail(params.id));
  }, [dispatch, params.id]);
  console.log("SOY EL USEEFFECT DE DETAILS", myVideogame);

  return (
    <div>
      <div>
        <h1>{myVideogame.name}</h1>
        <img src={myVideogame.image} alt="" width="476px" height="400px" />
        <div>
          <h4>🏆Rating: {myVideogame.rating} </h4>
          <h4>Released: {myVideogame.released}</h4>
          <h4>Platform: {myVideogame.platforms}</h4>
          <h4>
            Genres:
            {myVideogame.genres}
          </h4>
          <p>Description:{myVideogame.description} </p>
        </div>
        <Link to="/home">
          <button>Go Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Details;
