import React, { useState, useEffect } from 'react';
import { getMostDownloadedSongs, getSongsByReleaseDate, getSongsByArtist, getSongsByGenre, getCollaboratorsByArtist } from '../services/songService';
import { getArtists } from '../services/artistService';
import styles from './ReportsPage.module.css';

const ReportsPage = () => {
  const [mostDownloaded, setMostDownloaded] = useState([]);
  const [songsByDate, setSongsByDate] = useState([]);
  const [songsByArtist, setSongsByArtist] = useState([]);
  const [songsByGenre, setSongsByGenre] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedArtistForCollaborators, setSelectedArtistForCollaborators] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      const mostDownloadedData = await getMostDownloadedSongs();
      setMostDownloaded(mostDownloadedData);
      const artistsData = await getArtists();
      setArtists(artistsData);
      const allSongs = await getMostDownloadedSongs();
      const allGenres = [...new Set(allSongs.flatMap(song => song.genres))];
      setGenres(allGenres);
    };
    fetchInitialData();
  }, []);

  const handleGetSongsByDate = async () => {
    if (startDate && endDate) {
      const songs = await getSongsByReleaseDate(startDate, endDate);
      setSongsByDate(songs);
    }
  };

  const handleGetSongsByArtist = async () => {
    if (selectedArtist) {
      const songs = await getSongsByArtist(selectedArtist);
      setSongsByArtist(songs);
    }
  };

  const handleGetSongsByGenre = async () => {
    if (selectedGenre) {
      const songs = await getSongsByGenre(selectedGenre);
      setSongsByGenre(songs);
    }
  };

  const handleGetCollaborators = async () => {
    if (selectedArtistForCollaborators) {
      const collaboratorsData = await getCollaboratorsByArtist(selectedArtistForCollaborators);
      setCollaborators(collaboratorsData);
    }
  };

  return (
    <div className={styles.reportsContainer}>
      <h2>📊 Reportes</h2>

      <div className={styles.reportSection}>
        <h3>Top 10 Canciones Más Descargadas</h3>
        <ul>
          {mostDownloaded.map(song => (
            <li key={song._id}>
              <strong>{song.name}</strong> by {song.artist.name} - {song.downloads} descargas
              <p>Fecha de Lanzamiento: {new Date(song.releaseDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.reportSection}>
        <h3>Canciones por Fecha de Lanzamiento</h3>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <button onClick={handleGetSongsByDate}>Generar</button>
        <ul>
          {songsByDate.map(song => (
            <li key={song._id}>
              <strong>{song.name}</strong> by {song.artist.name}
              <p>Fecha de Lanzamiento: {new Date(song.releaseDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.reportSection}>
        <h3>Canciones por Artista</h3>
        <select value={selectedArtist} onChange={e => setSelectedArtist(e.target.value)}>
          <option value="">Seleccione un artista</option>
          {artists.map(artist => (
            <option key={artist._id} value={artist._id}>{artist.name}</option>
          ))}
        </select>
        <button onClick={handleGetSongsByArtist}>Generar</button>
        <ul>
          {songsByArtist.map(song => (
            <li key={song._id}>
              <strong>{song.name}</strong>
              <p>Fecha de Lanzamiento: {new Date(song.releaseDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.reportSection}>
        <h3>Canciones por Género</h3>
        <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
          <option value="">Seleccione un género</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <button onClick={handleGetSongsByGenre}>Generar</button>
        <ul>
          {songsByGenre.map(song => (
            <li key={song._id}>
              <strong>{song.name}</strong> by {song.artist.name}
              <p>Fecha de Lanzamiento: {new Date(song.releaseDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.reportSection}>
        <h3>Colaboradores por Artista</h3>
        <select value={selectedArtistForCollaborators} onChange={e => setSelectedArtistForCollaborators(e.target.value)}>
          <option value="">Seleccione un artista</option>
          {artists.map(artist => (
            <option key={artist._id} value={artist._id}>{artist.name}</option>
          ))}
        </select>
        <button onClick={handleGetCollaborators}>Generar</button>
        <ul>
          {collaborators.map((collab, index) => (
            <li key={index}>
              <strong>{collab.collaborator.name}</strong> en la canción <em>{collab.song.name}</em>
              <p>Fecha de Lanzamiento: {new Date(collab.song.releaseDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportsPage;
