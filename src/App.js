import React from 'react';
import bookIcon from './img/book-icon.png';
import perritoNavi from './img/iconoPerrito.png';
import './App.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {useLocalStorage} from './components/useLocalStorage'
import { Navbar, Nav } from 'react-bootstrap';
import Buscador from './components/Buscador.jsx';
import Buscador2 from './components/Buscador2.jsx';

function App() {
  const [currentIcon, setIcon] = useLocalStorage('icon', bookIcon)

  return (
    <div className="App">
      <Router>
        <header>
          <div className="logo-Tittle">
            <h2>Buscador de libros</h2>
            <img src={currentIcon} className="logo" alt="logo" height="100" width="100" />
          </div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="App.js"></Navbar.Brand>
            <Nav className="mr-auto">
              <Link
                to="/home"
                className="nav-link"
                onClick={() => setIcon(bookIcon)}
              >
                Buscador Normal
              </Link>
              <Link
                to="/paraLuara"
                className="nav-link"
                onClick={() => setIcon(perritoNavi)}
              >
                Para Laura
              </Link>
            </Nav>
          </Navbar>
        </header>

        <main className="App-main">
          <Routes>
            <Route path="/home" element={<Buscador />} />
            <Route path="/paraLuara" element={<Buscador2 />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
