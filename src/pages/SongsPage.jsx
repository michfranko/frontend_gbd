import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSongs } from '../services/songService';
import styles from './SongsPage.module.css';

const SongsPage = () => {
  // Estado para almacenar la lista de canciones
  const [songs, setSongs] = useState([]);
  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect para buscar canciones cuando el componente se monta o el término de búsqueda cambia
  useEffect(() => {
    const fetchSongs = async () => {
      // Llama al servicio para obtener las canciones, pasando el término de búsqueda
      const songs = await getSongs(searchTerm);
      setSongs(songs);
    };
    fetchSongs();
  }, [searchTerm]);

  return (
    <div className={styles.songsContainer}>
      <div className={styles.header}>
        <h2>🎶 Lista de Canciones</h2>
        <Link to="/add-song" className={styles.addButton}>Agregar Canción</Link>
      </div>
      <input
        type="text"
        placeholder="Buscar canciones..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className={styles.songList}>
        {songs.map((song) => (
          <li key={song._id} className={styles.songItem}>
            <div>
              <strong>{song.name}</strong> by {song.artist.name}
              <p>Géneros: {song.genres.join(', ')}</p>
            </div>
            <audio controls src={`http://localhost:5000/songs/audio/${song.audioFileId}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsPage;
