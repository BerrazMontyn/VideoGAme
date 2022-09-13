import React from "react";

export default function Paginado({
  videoGamePerPage,
  allVideogames,
  paginado,
}) {
  const pageNumber = [];

  for (let i = 0; i < Math.ceil(allVideogames / videoGamePerPage); i++) {
    pageNumber.push(i + 1);
  }
  return (
    <nav>
      <div>
        {pageNumber &&
          pageNumber.map(
            (
              number //si en pageNumber hay algo mapealo
            ) => (
              <span key={number}>
                <button onClick={() => paginado(number)}>{number}</button>{" "}
                {/* y por cada elemento renderizame un boton y agregales un evento onClick, el cual establecera el numero de pagina en el que me encuentro*/}
              </span>
            )
          )}
      </div>
    </nav>
  );
}
