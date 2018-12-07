require("dotenv").config();

var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');


//keys was created locally so you must include the path
var keys = require('./keys')
// console.log(keys.spotify);

var spotify =  new Spotify(keys.spotify);

var userChoice = process.argv[2];


switch (userChoice) {
    case 'concert-this':
        show();
        console.log('concert');
        break;

    case 'spotify-this-song': 
        song();
        console.log('spotify');
        break;

    // case 'movie-this': 
    //     console.log('movie');
    //     break;

    default:
        console.log('please enter something!');
        break;
}

function show() {
    var artist = process.argv[3];
    for (let i = 4; i < process.argv[3].length; i++) {
        artist += " " + process.argv[i];
    }
    
    var queryURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${keys.bands.id}`
    axios.get(queryURL).then(
        function(response) {
           console.log(response.data[0].venue);
           console.log(response.data[0].datetime);
        }
    )
}   

function song() {
    var songName = process.argv[3];
    for (let i = 4; i < process.argv.length; i++) {
        songName += " " + process.argv[i];

    }
    spotify
        .search({ type: 'track', query: songName, limit: 1 })
        .then(function (response) {
            var myJSON = JSON.stringify(response, null, 2);
           
            console.log("Artist Name: ", response.tracks.items[0].album.artists[0].name);
            console.log("PreviewLink: ", response.tracks.items[0].album.external_urls.spotify);
            console.log("Featured Album: ", response.tracks.items[0].album.name);
            console.log("Song Title: ", response.tracks.items[0].name);


        })
        .catch(function (err) {
            console.log(err);
        });
}

