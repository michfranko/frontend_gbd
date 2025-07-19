import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>🎵 Music Streaming App</h1>
    <nav>
      <Link to="/">Inicio</Link> | 
      <Link to="/songs">Canciones</Link> | 
      <Link to="/artists">Artistas</Link> | 
      <Link to="/reports">Reportes</Link> |
      <Link to="/add-song">Agregar Canción</Link>
    </nav>
  </header>
);

export default Header;
