import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArtists } from '../services/artistService';
import styles from './ArtistsPage.module.css';

const ArtistsPage = () => {
  // Estado para almacenar la lista de artistas
  const [artists, setArtists] = useState([]);
  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect para buscar artistas cuando el componente se monta o el término de búsqueda cambia
  useEffect(() => {
    const fetchArtists = async () => {
      // Llama al servicio para obtener los artistas, pasando el término de búsqueda
      const artists = await getArtists(searchTerm);
      setArtists(artists);
    };
    fetchArtists();
  }, [searchTerm]);

  return (
    <div className={styles.artistsContainer}>
      <div className={styles.header}>
        <h2>🎤 Artistas Registrados</h2>
        <Link to="/add-artist" className={styles.addButton}>Agregar Artista</Link>
      </div>
      <input
        type="text"
        placeholder="Buscar artistas..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className={styles.artistList}>
        {artists.map((artist) => (
          <li key={artist._id} className={styles.artistItem}>
            {artist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistsPage;
