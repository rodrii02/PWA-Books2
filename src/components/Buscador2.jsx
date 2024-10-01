import React, { useState, useEffect } from 'react';

export const Buscador2 = () => {
  const [heartArray, setHeartArray] = useState([]); // Estado para almacenar las líneas del corazón
  const [index, setIndex] = useState(0); // Estado para controlar el índice de las líneas

  useEffect(() => {
    const heartShape = generateHeart(); // Array que contiene las líneas del corazón

    if (index < heartShape.length) {
      const timer = setTimeout(() => {
        // Agrega una nueva línea al corazón cada 700ms
        setHeartArray((prev) => [...prev, heartShape[index]]);
        setIndex(index + 1);
      }, 500); // Ajusta este tiempo para controlar la velocidad del dibujo
      return () => clearTimeout(timer); // Limpia el temporizador para evitar acumulaciones
    }
  }, [index]); // Solo dependemos de `index`, el efecto se ejecuta cuando cambia

  const generateHeart = () => {
    // El corazón se define como un array de strings que representan líneas
    return [
      "      *****       *****      ",
      "   **********   ***********  ",
      " *****************************",
      "*******************************",
      " ***************************** ",
      "   *************************   ",
      "    ***********************    ",
      "     *********************     ",
      "       *****************       ",
      "         ***************        ",
      "           ***********          ",
      "             *******            ",
      "               ***              ",
      "                *               ",
    ];
  };

  return (
    <div className="feliz-dia-novia">
      <h1 style={{ textAlign: 'center', color: '#ff1493' }}>💖 Feliz Día de la NovIA, Lauraaa 💖</h1>
      <pre style={{ textAlign: 'center', fontSize: '1.5em', color: '#ff69b4', lineHeight: '1.2em' }}>
        {heartArray.join('\n')}
      </pre>
    </div>
  );
}

export default Buscador2;
