const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: { type: String, required: true, trim: true },
  genres: [{ type: String, required: true, trim: true }],
  releaseDate: { type: Date, required: true },
  awards: [{ type: String, trim: true }],
  downloads: { type: Number, default: 0 },
  audioFileUrl: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
}, {
  timestamps: true,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
