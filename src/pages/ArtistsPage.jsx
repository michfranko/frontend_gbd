import React, { useEffect, useState } from 'react';
import { getSongs } from '../services/songService';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const songs = getSongs();
    const allArtists = songs.flatMap(song => song.artists);
    const unique = Array.from(new Set(allArtists.map(a => a.name)))
      .map(name => allArtists.find(a => a.name === name));
    setArtists(unique);
  }, []);

  return (
    <div>
      <h2>🎤 Artistas Registrados</h2>
      <ul>
        {artists.map((a, i) => (
          <li key={i}>{a.name} ({a.country})</li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistsPage;
