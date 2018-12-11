// console.log("Hello");

var userinput = process.argv[3];
var action = process.argv[2];

var axios = require("axios");
var Spotify = require('node-spotify-api');


var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var text = "";

var fs = require("fs");

// =====================================
// ========= inquirer=====================
var inquirer = require("inquirer");

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is your name?",
      name: "username"
    },
    // Here we create a basic password-protected text prompt.
    {
      type: "password",
      message: "Set your password",
      name: "password"
    },
    // Here we give the user a list to choose from.
    {
      type: "list",
      message: "Select for run?",
      choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "select"
    },
    // Here we ask the user to confirm.
    // {
    //   type: "confirm",
    //   message: "Are you sure:",
    //   name: "confirm",
    //   default: true
    // }
  ])
  .then(function (inquirerResponse) {
    logData("\n" + inquirerResponse.username);
    switch (inquirerResponse.select) {
      case "concert-this":
        inquirer
          .prompt([
            {
              type: "input",
              message: "Type concert name",
              name: "concertname"
            }
          ])
          .then(function (concert) {
            logData(" concert-this :" + concert.concertname);
            text = concert.concertname;
            artist(text);
          });
        break;

      case "spotify-this-song":
        inquirer
          .prompt([
            {
              type: "input",
              message: "Type song name",
              name: "songname"
            }
          ])
          .then(function (play) {
            logData(" spotify-this-song :" + play.songname);
            text = play.songname;
            spotifysong(text);
          });
        break;

      case "movie-this":
        inquirer
          .prompt([
            {
              type: "input",
              message: "Type movie name",
              name: "moviename"
            }
          ])
          .then(function (play) {
            logData(" movie-this :" + play.moviename);
            text = play.moviename;
            movie(text);
          });
        break;

      case "do-what-it-says":
        logData(" do-what-it-says");
        dowhatitsays();
        break;
    }
  })

// =====================================
// ========= inquirer=====================

// switch (action) {
//   case "concert-this":
//     artist();
//     break;

//   case "spotify-this-song":
//     song = userinput;
//     spotifysong(song);
//     break;

//   case "movie-this":
//     movie();
//     break;

//   case "do-what-it-says":
//     dowhatitsays();
//     break;

// }

function artist(concert) {
  axios.get("https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp").then(
    function (response) {
      console.log("key loaded");
      console.log("Upcoming concerts for " + concert + " :");

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
function movie(movie) {
  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
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
function dowhatitsays() {
  fs.readFile("random.txt", "utf8", function (error, data) {

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

function logData(userdata) {

  fs.appendFile("log.txt", userdata, function (err) {
    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
      // console.log("Content Added!");
    }

  });
}
