import React, { useState } from 'react';

export const Libro = ({ urlImg, titulo, autor, linkMasInfo, descripcion }) => {
  const [mostrarMas, setMostrarMas] = useState(false);

  const toggleDescripcion = () => {
    setMostrarMas(!mostrarMas);
  };

  return (
    <div className='libro'>
      <img src={urlImg} alt='Icono libro' width="128" height="200"/>
      <div className='infoLibro'>
        <h3>Titulo libro: {titulo}</h3>
        <h3>Autor libro: {autor}</h3>
        <h3>
          Descripción: 
          <p>
            {descripcion && (
              mostrarMas ? descripcion : `${descripcion.slice(0, 150)}... `
            )}
            {descripcion && (
              <span
                className={mostrarMas ? 'verMas verMenos' : 'verMas'}
                onClick={toggleDescripcion}
              >
                {mostrarMas ? 'Ver menos' : 'Ver más'}
              </span>
            )}
          </p>
        </h3>
        <a href={linkMasInfo} target="_blank" rel="noopener noreferrer">Más información del libro</a>
      </div>
    </div>
  );
};
