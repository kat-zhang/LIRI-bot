require("dotenv").config();

var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

//keys was created locally so you must include the path
var keys = require('./keys')
// console.log(keys.spotify);

var spotify =  new Spotify(keys.spotify);

var userChoice = process.argv[2];


switch (userChoice) {
    /// Switch-case for concert info, calls concertInfo fx
    case 'concert-this':
        concertInfo();
        console.log('concert');
        break;

    /// Switch-case for song info, calls songInfo fx
    case 'spotify-this-song': 
    var songName = process.argv[3];

    // Condition so the info for The Sign is displayed if there is no user input after "...spotify-this-song"
    if (process.argv[3]=== undefined) {
        songName = "Ace of Base"

    }
    else {
        songName === process.argv[3]
    
    for (let i = 4; i < process.argv.length; i++) {
        songName += " " + process.argv[i];

    }
}
        songInfo();
        console.log('spotify');
        break;

    case 'movie-this': 
    var movieTitle = process.argv[3];

    // Condition so the info for Mr. Robot is displayed if there is no user  input after "...movie-this"
    if (process.argv[3]=== undefined) {
        movieTitle = "Mr. Nobody"

    }
    else {
        movieTitle === process.argv[3]
    
    for (let i = 4; i < process.argv.length; i++) {
        movieTitle += " " + process.argv[i];
    }
}
        movieInfo();
        console.log('movie');
        break;

    /// Switch-case for readFile fx
    case 'do-what-it-says':
    whatever();
    break;
    /// If user does not type anything in command line after "node liribot"
    default:
        console.log('please enter something!');
        break;
}

// Function to show concert based on user input 
function concertInfo() {
    var artist = process.argv[3];
    for (let i = 4; i < process.argv.length; i++) {
        artist += " " + process.argv[i];
    }
    
    var queryURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${keys.bands.id}`
    axios.get(queryURL).then(
        function(response) {
         for (i = 0 ; i < response.data.length; i++) {
           console.log("- Venue Name: ", response.data[i].venue.name);
           console.log("- Date & Time: ", moment(response.data[i].datetime).format('LLL'));
           console.log("- Location: ", response.data[i].venue.city + ", " + response.data[i].venue.country)
           console.log("---------------------------------------");
        }
        }
    )
}

function songInfo() {

    spotify
        .search({ type: 'track', query: songName, limit: 1 })
        .then(function (response) {
        
            console.log("- Song Title: ", response.tracks.items[0].name);
            console.log("- Artist Name: ", response.tracks.items[0].album.artists[0].name);
            console.log("- Featured Album: ", response.tracks.items[0].album.name);
            console.log("- Preview Link: ", response.tracks.items[0].album.external_urls.spotify);
            
            


        })
        .catch(function (err) {
            console.log(err);
        });
}


function movieInfo() {
    // var movieTitle = process.argv[3];
    for (let i = 4; i < process.argv.length; i++) {
        movieTitle += " " + process.argv[i];
    }
    var queryURL = `http://www.omdbapi.com/?t=${movieTitle}&y=&plot=short&apikey=${keys.movies.id}`;
    axios.get(queryURL).then(
        function(response) {
            console.log("- Movie Title: " + response.data.Title);
        console.log("- Release Year: " + response.data.Year);
        console.log("- IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("- Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("- Produced in: " + response.data.Country);
        console.log("- Language: " + response.data.Language);
        console.log("- Plot Summary: " + response.data.Plot);
        console.log("- Lead Actors: " + response.data.Actors);
        }
    )
}


function whatever() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        // console.log(dataArr);
        if (dataArr[0] === "spotify-this-song") {
            songName = dataArr[1];
            songInfo();
        }

    });
} 