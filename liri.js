// console.log("Hello");

var userinput = process.argv[3];
var action = process.argv[2];

var axios = require("axios");
var spotify = require('spotify');
var Spotify = require('node-spotify-api');

// require("dotenv").config();
var keys = require("./keys.js");
var spo = new Spotify(keys.spotify);
// var key = require("./keys.js")


switch (action) {
  case "concert-this":
    artist();
    break;

  case "spotify-this-song":
    song();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":

    break;

}

function artist() {
  axios.get("https://rest.bandsintown.com/artists/" + userinput + "/events?app_id=codingbootcamp").then(
    function (response) {
      console.log("key loaded");
      console.log("Upcoming concerts for " + userinput + " :");
      
      for (var i = 0; i < response.data.length; i++) {
        var datetime = response.data[i].datetime;
        var dt= [] = datetime.split("T");
        var date = [] = dt[0].split("-");
        console.log(response.data[i].venue.city + " , " + response.data[i].venue.country + " at " + response.data[i].venue.name+" "+date[2]+"-"+date[1]+"-"+date[0]);
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
function song() {
  var spotify = new Spotify({
    id: "f0702defba8e47259a974403ad056a20",
    secret: "346187bbbbc8448aa7e6c90660c18b85"
  });

  spo.search({ type: 'track', query: 'celebration', limit: 20 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + error);
    }
    for (var i = 0 ; i < data.tracks.items.length; i++){
      console.log(i);
      console.log("artist(s) : "+data.tracks.items[i].album.artists[0].name);
      console.log("song name : "+data.tracks.items[i].name);
      console.log("preview song : "+data.tracks.items[i].preview_url)
      console.log("album : "+data.tracks.items[i].album.name)
      console.log("----------------------------------------------")
    }
    // console.log(data.tracks.items)
    
  });

}

// ==========spotify this song ====================
