import React, { useState } from 'react';
import logo from '../logo.svg';
import { Libro } from './Libro';
import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';

export const Buscador2 = () => {
  const [libros, setLibros] = useLocalStorage('libros', []);
  const [inputText, setInputText] = useLocalStorage('tituloLibro', '');
  const [loading, setLoading] = useState(false); // Estado para indicar si está cargando

  const buscarLibros = async () => {
    if (inputText.trim() === '') {
      window.alert('Por favor, ingresa el título de un libro antes de buscar.');
      return;
    }

    setLoading(true); // Mostrar la barra de carga al iniciar la búsqueda

    const nLibros = [];
    try {
      const respuesta = await axios.get("https://www.googleapis.com/books/v1/volumes?", {
        params: {
          q: inputText,
          printType: "books",
          maxResults: "40",
          key: "AIzaSyDfGIisB2KQFt8n8Q2c1MxNikCtbiwJczg"
        }
      })

      if (respuesta.status === 200) {
        respuesta.data.items.forEach((libro) => {
          const nuevoLibro = (
            <Libro
              urlImg={libro.volumeInfo.readingModes.image ? libro.volumeInfo.imageLinks.smallThumbnail : logo}
              titulo={libro.volumeInfo.title}
              autor={libro.volumeInfo.authors ? libro.volumeInfo.authors.join(', ') : 'Autor desconocido'}
              linkMasInfo={libro.volumeInfo.infoLink}
              descripcion={libro.volumeInfo.description}
            />
          );
          nLibros.push(nuevoLibro);
        });
      }
    } catch (error) {
      console.log(error)
    }

    setLoading(false); // Ocultar la barra de carga al finalizar la búsqueda
    setLibros(nLibros);
  }

  return (
    <div className='buscador-libros'>
      <div className='buscador'>
        <h1>Introduce el nombre del libro: </h1>
        <input type='text' placeholder='Escribe el titulo de un libro' value={inputText} onChange={(e) => setInputText(e.target.value)}></input>
        <button onClick={buscarLibros}>Buscar</button>
      </div>
      <div className='libros'>
        {loading && (
          <div className='centrado'>
            <p>Cargando...</p>
          </div>
        )}
        <ul>
          {libros.map((libro, indice) => {
            return (<li key={indice}>{libro}</li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export default Buscador2;
