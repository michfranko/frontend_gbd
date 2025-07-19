import React, { useEffect, useState } from 'react';
import { getSongs } from '../services/songService';

const SongsPage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(getSongs());
  }, []);

  return (
    <div>
      <h2>🎶 Lista de Canciones</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <strong>{song.name}</strong> - Géneros: {song.genres.join(', ')}<br />
            Artistas: {song.artists.map(a => a.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsPage;
