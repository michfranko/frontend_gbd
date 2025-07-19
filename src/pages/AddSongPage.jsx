import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSong } from '../services/songService';
import styles from './AddSongPage.module.css';

const AddSongPage = () => {
  const [songName, setSongName] = useState('');
  const [genres, setGenres] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [awards, setAwards] = useState('');
  const [downloads, setDownloads] = useState(0);
  const [audioFile, setAudioFile] = useState(null);
  const [artists, setArtists] = useState([{ name: '', country: '', birthDate: '', genre: '' }]);
  const navigate = useNavigate();

  const handleArtistChange = (index, event) => {
    const values = [...artists];
    values[index][event.target.name] = event.target.value;
    setArtists(values);
  };

  const handleAddArtist = () => {
    setArtists([...artists, { name: '', country: '', birthDate: '', genre: '' }]);
  };

  const handleRemoveArtist = (index) => {
    const values = [...artists];
    values.splice(index, 1);
    setArtists(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!songName || !genres || !releaseDate || downloads < 0 || artists.some(a => !a.name)) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    const newSong = {
      name: songName,
      genres: genres.split(',').map(g => g.trim()),
      releaseDate,
      awards: awards.split(',').map(a => a.trim()),
      downloads,
      audioFileName: audioFile ? audioFile.name : null,
      artists,
    };

    saveSong(newSong);
    alert('Canción guardada con éxito!');
    navigate('/songs');
  };

  return (
    <div className={styles.formContainer}>
      <h2>Agregar Nueva Canción</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nombre de la canción:</label>
          <input type="text" value={songName} onChange={(e) => setSongName(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Géneros (separados por coma):</label>
          <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Fecha de estreno:</label>
          <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Premios (separados por coma):</label>
          <textarea value={awards} onChange={(e) => setAwards(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Descargas:</label>
          <input type="number" value={downloads} onChange={(e) => setDownloads(e.target.value)} required min="0" />
        </div>
        <div className={styles.formGroup}>
          <label>Archivo de audio (.mp3):</label>
          <input type="file" accept=".mp3" onChange={(e) => setAudioFile(e.target.files[0])} />
        </div>

        <div className={styles.artistSection}>
          <h3>Artistas</h3>
          {artists.map((artist, index) => (
            <div key={index} className={styles.artistCard}>
              <input type="text" name="name" placeholder="Nombre del artista" value={artist.name} onChange={(e) => handleArtistChange(index, e)} required />
              <input type="text" name="country" placeholder="País" value={artist.country} onChange={(e) => handleArtistChange(index, e)} />
              <input type="date" name="birthDate" placeholder="Fecha de nacimiento" value={artist.birthDate} onChange={(e) => handleArtistChange(index, e)} />
              <input type="text" name="genre" placeholder="Género musical" value={artist.genre} onChange={(e) => handleArtistChange(index, e)} />
              {artists.length > 1 && <button type="button" className={styles.removeArtistButton} onClick={() => handleRemoveArtist(index)}>X</button>}
            </div>
          ))}
          <button type="button" className={styles.addArtistButton} onClick={handleAddArtist}>Agregar Artista</button>
        </div>

        <button type="submit" className={styles.submitButton}>Guardar Canción</button>
      </form>
    </div>
  );
};

export default AddSongPage;
