// Mock data
let songs = [
  {
    id: 1,
    name: 'Bohemian Rhapsody',
    genres: ['Rock', 'Opera'],
    releaseDate: '1975-10-31',
    awards: ['Grammy Hall of Fame'],
    downloads: 1000000,
    audioFileName: 'bohemian_rhapsody.mp3',
    artists: [
      { name: 'Freddie Mercury', country: 'UK', birthDate: '1946-09-05', genre: 'Rock' }
    ]
  },
  {
    id: 2,
    name: 'Stairway to Heaven',
    genres: ['Rock'],
    releaseDate: '1971-11-08',
    awards: ['Grammy Hall of Fame'],
    downloads: 800000,
    audioFileName: 'stairway_to_heaven.mp3',
    artists: [
      { name: 'Robert Plant', country: 'UK', birthDate: '1948-08-20', genre: 'Rock' }
    ]
  }
];

let nextId = 3;

export const getSongs = () => {
  return songs;
};

export const saveSong = (song) => {
  const newSong = { ...song, id: nextId++ };
  songs.push(newSong);
  // In a real app, you would use localStorage or an API call here
  // localStorage.setItem('songs', JSON.stringify(songs));
};
