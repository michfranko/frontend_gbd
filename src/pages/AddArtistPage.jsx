import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveArtist } from '../services/artistService';
import styles from './AddArtistPage.module.css';

const AddArtistPage = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !country || !birthDate || !genre) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      await saveArtist({ name, country, birthDate, genre });
      alert('Artista guardado con éxito!');
      navigate('/artists');
    } catch (error) {
      console.error('Error saving artist:', error);
      alert('Error al guardar el artista.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Agregar Nuevo Artista</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nombre del artista:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>País:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Fecha de nacimiento:</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Género musical:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </div>
        <button type="submit" className={styles.submitButton}>Guardar Artista</button>
      </form>
    </div>
  );
};

export default AddArtistPage;
