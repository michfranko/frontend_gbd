import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SongsPage from './pages/SongsPage';
import ArtistsPage from './pages/ArtistsPage';
import ReportsPage from './pages/ReportsPage';
import AddSongPage from './pages/AddSongPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/add-song" element={<AddSongPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
