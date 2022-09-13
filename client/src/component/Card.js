import React from "react";
import { Link } from "react-router-dom";
import style from "../Css.module/Card.module.css";

function Card({ name, image, genres, rating, id }) {
  return (
    <div className={style.card}>
      <div className={style.card2}>
        <Link to={`/details/${id}`}>
          <h2>{name}</h2>
          <img src={image} alt="Img not found" width="214px" height="221px" />
          <h3>
            {genres?.map((genre, id) => (
              <span key={id}> {genre.name} </span>
            ))}
          </h3>
          <h3>Rating: {rating}</h3>
        </Link>
      </div>
    </div>
  );
}
export default Card;
