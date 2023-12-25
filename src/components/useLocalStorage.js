import { useState} from "react";
import { Libro } from './Libro';

export function useLocalStorage(key, initalValue){
    const [storedValue, setStoredValue] = useState( () => {
        try {
            const item = window.localStorage.getItem(key)
            if(key === 'libros'){ //Si son libros devuelvo los libros parseados con el formato correspondiente
                const parseLibros = JSON.parse(item)
                const nLibros = []
                console.log(parseLibros)
                parseLibros.forEach((libro) => {
                  const nuevoLibro = (
                    <Libro
                      urlImg={libro.props.urlImg}
                      titulo={libro.props.titulo}
                      autor={libro.props.autor}
                      linkMasInfo={libro.props.linkMasInfo}
                    />
                  );
                  nLibros.push(nuevoLibro)
                })
                return nLibros
            }
            return item ? JSON.parse(item) : initalValue
        } catch (error) {
            return initalValue
        }
    })

    const setValue = value => {
        try {
            setStoredValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(error)
        }
    }

    return [storedValue, setValue]
}