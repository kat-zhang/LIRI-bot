//this file is a node module 

console.log('this is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

exports.bands = {
    secret: process.env.BANDS_API_KEY
};
  