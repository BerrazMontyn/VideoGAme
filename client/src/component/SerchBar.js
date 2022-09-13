import React from "react";
import { useState } from "react";
import { getNameVideogames } from "../actions";
import { useDispatch } from "react-redux";

function SerchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [error, setErrors] = useState({});
  const err = /^[0-9a-zA-ZÁ-ÿ.:-\s]{0,40}$/;

  function handleInputChange(e) {
    e.preventDefault();
    setInput(e.target.value);
    if (!err.exec(e.target.value)) {
      e.target.value.length > 40
        ? setErrors({
            name: "invalid length",
          })
        : setErrors({
            name: "invalid character",
          });
    } else {
      setErrors({
        name: "",
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameVideogames(input));
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar.."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        SEARCH
      </button>
    </div>
  );
}
export default SerchBar;
