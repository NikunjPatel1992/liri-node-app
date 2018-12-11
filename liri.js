// console.log("Hello");

var userinput = process.argv[3];
var action = process.argv[2];

var axios = require("axios");
var Spotify = require('node-spotify-api');


var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var song ="";

var fs = require("fs");

var inquirer = require("inquirer");

switch (action) {
  case "concert-this":
    artist();
    break;

  case "spotify-this-song":
    song = userinput;
    spotifysong(song);
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    dowhatitsays();
    break;

}

function artist() {
  axios.get("https://rest.bandsintown.com/artists/" + userinput + "/events?app_id=codingbootcamp").then(
    function (response) {
      console.log("key loaded");
      console.log("Upcoming concerts for " + userinput + " :");

      for (var i = 0; i < response.data.length; i++) {
        var datetime = response.data[i].datetime;
        var dt = [] = datetime.split("T");
        var date = [] = dt[0].split("-");
        console.log(response.data[i].venue.city + " , " + response.data[i].venue.country + " at " + response.data[i].venue.name + " " + date[2] + "-" + date[1] + "-" + date[0]);
        // console.log(response.data[i].venue);
        // console.log(response.data[i].datetime);
      }

    });
}
// ==========movie this ====================
function movie() {
  axios.get("http://www.omdbapi.com/?t=" + userinput + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      console.log("key loaded");
      console.log("Title : " + response.data.Title);
      console.log("Year : " + response.data.Year);
      console.log("Rated : " + response.data.Rated);
      console.log("IMD Rating : " + response.data.imdbRating);
      console.log("Country : " + response.data.Country);
      console.log("Language : " + response.data.Language);
      console.log("Plot : " + response.data.Plot);
      // console.log(response.data);
    }
  );
}
// ==========movie this ====================

// ==========spotify this song ====================
function spotifysong(song) {

  spotify.search({ type: 'track', query: song, limit: 20 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + error);
    }
    for (var i = 0; i < data.tracks.items.length; i++) {
      console.log(i);
      console.log("artist(s) : " + data.tracks.items[i].album.artists[0].name);
      console.log("song name : " + data.tracks.items[i].name);
      console.log("preview song : " + data.tracks.items[i].preview_url)
      console.log("album : " + data.tracks.items[i].album.name)
      console.log("----------------------------------------------")
    }
    // console.log(data.tracks.items)

  });

}
// ==========spotify this song ====================

// ============do-what-it-says==================
function dowhatitsays(){
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }

    // console.log(data);
    var songname = data.split('"')
    // console.log(songname[1]);
    spotifysong(songname[1]);
  });  
}
// ============do-what-it-says==================
