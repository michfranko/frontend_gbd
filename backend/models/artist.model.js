const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  birthDate: { type: Date, required: true },
  genre: { type: String, required: true, trim: true },
}, {
  timestamps: true,
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
