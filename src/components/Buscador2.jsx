import React from 'react';
import logo from '../logo.svg';
import { Libro } from './Libro';
import axios from 'axios';
import {useLocalStorage} from './useLocalStorage'
import { useState } from 'react';

export const Buscador2 = () => {

  const [libros, setLibros] = useLocalStorage('libros', []);
  const [inputText, setInputText] = useLocalStorage('tituloLibro', ''); // Nuevo estado para el texto del input
  var [startIndex, setIndex] = useState(250); // Nuevo estado para el texto del input
  const [lastCategory, setLastCategory] = useState('holi');
  const [loading, setLoading] = useState(false); // Estado para indicar si está cargando


  const buscarLibros = async() => {
    if (inputText.trim() === '') {
      // Mostrar un mensaje de alerta si el campo está vacío
      window.alert('Por favor, ingresa el título de un libro antes de buscar.');
      return; // Salir de la función si el campo está vacío
    }
  
    setLoading(true); // Mostrar la barra de carga al iniciar la búsqueda

    try {
      const respuesta = await axios.get("https://www.googleapis.com/books/v1/volumes?", {
          params: {
              q: inputText,
              printType: "books",
              maxResults: "5",
              key: "AIzaSyDfGIisB2KQFt8n8Q2c1MxNikCtbiwJczg"
          }
      })
      var nLibros = []
      var categoriaLibro = ""
      if(respuesta.status === 200){ //si hay respuesta
        for (const libro of respuesta.data.items) {
            if (libro.volumeInfo.categories) {
              categoriaLibro = libro.volumeInfo.categories;
              break; // Salir del bucle una vez que se ha encontrado un libro con categoría
            }
        }
        console.log(lastCategory)
        console.log(categoriaLibro)
        console.log("sfwefwfwe")
        if (lastCategory.at(0) !== categoriaLibro.at(0)) {
          startIndex = 250; // Cambia el startIndex si la categoría es diferente
          setLastCategory(categoriaLibro);
        }

        try {
          while(nLibros.length < 40){
            const URL = `https://www.googleapis.com/books/v1/volumes?q=subjects:${categoriaLibro}&maxResults=40&printType=books&langRestrict=es&startIndex=${startIndex}`;

            const librosCategoriaEsp = await axios.get(URL);

            if(librosCategoriaEsp.status === 200){ //si hay respuesta
                librosCategoriaEsp.data.items.forEach((libro) => {
                  if(libro.volumeInfo.pageCount > 200){
                    const nuevoLibro = (
                      <Libro
                        urlImg={libro.volumeInfo.readingModes.image ? libro.volumeInfo.imageLinks.thumbnail: logo}
                        titulo={libro.volumeInfo.title}
                        autor={libro.volumeInfo.authors ? libro.volumeInfo.authors.join(', ') : 'Autor desconocido'}
                        linkMasInfo={libro.volumeInfo.infoLink}
                        descripcion={libro.volumeInfo.description}
                      />
                    );
                    nLibros.push(nuevoLibro);
                  }
                });
            }
            startIndex++;
            console.log(startIndex)
            console.log(nLibros.length)
          }
          setIndex(startIndex + 40)
        } catch (error) {
          console.log(error);
        }  

      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false); // Ocultar la barra de carga al finalizar la búsqueda
    setLibros(nLibros)
  }

  return (
    <div className='buscador-libros'>
      <div className='buscador'>
        <h1>Introduce el nombre del libro: </h1>
        <input type='text' placeholder='Escribe el titulo de un libro' value={inputText} onChange={(e) => setInputText(e.target.value)}></input>
        <button onClick={ e => buscarLibros()}> Buscar</button>
      </div>
      <div className='libros'>
        {loading && (
          <div className='centrado'>
            <p>Cargando...</p>
          </div>
        )}
        <ul>
          {
            libros.map ((libro, indice) => {
              return (<li key={indice}>
                {libro}
              </li>)
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Buscador2