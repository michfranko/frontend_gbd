import React, { useEffect, useState } from 'react';
import { getSongs } from '../services/songService';

const ReportsPage = () => {
  const [top, setTop] = useState([]);

  useEffect(() => {
    const songs = getSongs();
    const topSorted = [...songs].sort((a, b) => b.downloads - a.downloads).slice(0, 5);
    setTop(topSorted);
  }, []);

  return (
    <div>
      <h2>📊 Top 5 Canciones Más Descargadas</h2>
      <ol>
        {top.map((song, i) => (
          <li key={i}>{song.name} - {song.downloads} descargas</li>
        ))}
      </ol>
    </div>
  );
};

export default ReportsPage;
