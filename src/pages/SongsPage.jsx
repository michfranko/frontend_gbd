import React, { useEffect, useState } from 'react';
import { getSongs } from '../services/songService';
import styles from './SongsPage.module.css';

const SongsPage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const songs = await getSongs();
      setSongs(songs);
    };
    fetchSongs();
  }, []);

  return (
    <div className={styles.songsContainer}>
      <h2>🎶 Lista de Canciones</h2>
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
