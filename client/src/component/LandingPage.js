import React from "react";
import { Link } from "react-router-dom";
import style from "../Css.module/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.LandingContainer}>
      <h1 className={style.Bienvenido}> Press Start</h1>
      <Link to="/home">
        <button className={style.BtnStart}>Start!</button>
      </Link>
    </div>
  );
}
