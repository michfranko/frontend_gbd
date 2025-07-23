import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArtists } from '../services/artistService';
import styles from './ArtistsPage.module.css';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArtists = async () => {
      const artists = await getArtists();
      setArtists(artists);
    };
    fetchArtists();
  }, []);

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredArtists.map((artist) => (
          <li key={artist._id} className={styles.artistItem}>
            {artist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistsPage;
