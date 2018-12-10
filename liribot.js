require('dotenv').config();

var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

//keys was created locally so you must include the path
var keys = require('./keys')
// console.log(keys.spotify);

var spotify = new Spotify(keys.spotify);

var userChoice = process.argv[2];


switch (userChoice) {
    // Switch statement for concert info
    case "concert-this":
        var artist = process.argv[3];

        // Condition so Metallica's lastest tour dates are displayed if there is no user input after "...concert-this"
        if (process.argv[3] === undefined) {
            artist = "Metallica"

        } else {
            artist === process.argv[3]
        }
        for (let i = 4; i < process.argv.length; i++) {
            artist += " " + process.argv[i];
        }

        // Calls concertInfo fx, displays info for user input
        concertInfo();
        console.log(artist + "'s upcoming concerts:");
        console.log("");
        break;

        // Switch statement for song info
    case "spotify-this-song":
        var songName = process.argv[3];

        if (process.argv[3] === undefined) {
            songName = "Ace of Base"

        } else {
            songName === process.argv[3]

            for (let i = 4; i < process.argv.length; i++) {
                songName += " " + process.argv[i];

            }
        }
        songInfo();
        console.log("About this song:");
        console.log("");
        break;

        // Switch statement for movie info
    case "movie-this":
        var movieTitle = process.argv[3];

        if (process.argv[3] === undefined) {
            movieTitle = "Mr. Nobody"
            console.log("LIRI-bot has spoken!!!");
            console.log("");

        } else {
            movieTitle === process.argv[3]

            for (let i = 4; i < process.argv.length; i++) {
                movieTitle += " " + process.argv[i];
            }
        }
        movieInfo();
        console.log("LIRI-bot has found the following about",'"',movieTitle,'"');
        console.log("");
        break;

        /// Switch statement for whatever fx with read/writeFile module
    case "do-what-it-says":
        readWhatever();
        break;

        /// If user does not type anything in command line after "node liribot"
    default:
        console.log("please enter something!");
        break;
}

// Function to show concert based on user input 
function concertInfo() {
    // var artist = process.argv[3];
    // for (let i = 4; i < process.argv.length; i++) {
    //     artist += " " + process.argv[i];
    // }

    var queryURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${keys.bands.id}`
    axios.get(queryURL).then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {
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
        .search({
            type: "track",
            query: songName,
            limit: 1
        })
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
    // for (let i = 4; i < process.argv.length; i++) {
    //     movieTitle += " " + process.argv[i];
    // }
    var queryURL = `http://www.omdbapi.com/?t=${movieTitle}&y=&plot=short&apikey=${keys.movies.id}`;
    axios.get(queryURL).then(
        function (response) {
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


function readWhatever() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var readArr = data.split(",");
        // console.log(dataArr);
        if (readArr[0] === "spotify-this-song") {
            songName = readArr[1];
            songInfo();
            console.log("LIRI has spoken!!!")
            console.log("")
        }

    });
}

// function writeMovie (
    // fs.writeFile ("random.txt", "movie-this, Space Jam", function (error) {
    //     if  (error) {
    //         console.log(error)
    //     }
    // });

// function readMovie () {
//     fs.readFile...
// }
// function writeConcert(){}
// function readConcert(){}

// **Call functions in switch statement 
// ** The file random.txt is over-written once the user enters "do-what-it-says" on the command line
// and will read the new next and recieve a request, gather info and give a response according to the contents. 