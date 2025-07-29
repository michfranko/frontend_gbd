import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveSong } from '../services/songService';
import { getArtists } from '../services/artistService';
import styles from './AddSongPage.module.css';

const AddSongPage = () => {
  const [songName, setSongName] = useState('');
  const [genres, setGenres] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [awards, setAwards] = useState('');
  const [downloads, setDownloads] = useState(0);
  const [audioFile, setAudioFile] = useState(null);
  const [artistId, setArtistId] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const availableCollaborators = artists.filter(artist => artist._id !== artistId);

  const handleCollaboratorChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setCollaborators(selectedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!songName || !genres || !releaseDate || downloads < 0 || !artistId || !audioFile) {
      alert('Por favor, complete todos los campos requeridos y seleccione un archivo de audio.');
      return;
    }

    const formData = new FormData();
    formData.append('name', songName);
    formData.append('genres', genres);
    formData.append('releaseDate', releaseDate);
    formData.append('awards', awards);
    formData.append('downloads', downloads);
    formData.append('artistId', artistId);
    formData.append('audioFile', audioFile);
    collaborators.forEach(collaboratorId => {
      formData.append('collaborators[]', collaboratorId);
    });

    try {
      await saveSong(formData);
      alert('Canción guardada con éxito!');
      navigate('/songs');
    } catch (error) {
      console.error('Error saving song:', error);
      alert('Error al guardar la canción.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Agregar Nueva Canción</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.artistSection}>
          <h3>Artista</h3>
          <div className={styles.artistSelection}>
            <input
              type="text"
              placeholder="Buscar artista..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={artistId} onChange={(e) => setArtistId(e.target.value)} required>
              <option value="">Seleccione un artista</option>
              {filteredArtists.map(artist => (
                <option key={artist._id} value={artist._id}>{artist.name}</option>
              ))}
            </select>
            <Link to="/add-artist" className={styles.addArtistLink}>Agregar Nuevo Artista</Link>
          </div>
        </div>
        <div className={styles.artistSection}>
          <h3>Colaboradores</h3>
          <div className={styles.artistSelection}>
            <select multiple value={collaborators} onChange={handleCollaboratorChange} className={styles.collaboratorSelect}>
              {availableCollaborators.map(artist => (
                <option key={artist._id} value={artist._id}>{artist.name}</option>
              ))}
            </select>
          </div>
        </div>
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

        <button type="submit" className={styles.submitButton}>Guardar Canción</button>
      </form>
    </div>
  );
};

export default AddSongPage;
