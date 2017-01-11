//movie api variable
var request = require("request");

//spotify api variable
var getSpotify = require("spotify");

//fs package import
var fs = require("fs");

//Twitter Api Variables
var TwittwerImport = require("./key.js");
var Twitter = require("twitter");
var getKey = TwittwerImport.twitterKeys;
console.log(getKey);
var client = new Twitter(getKey);

//user input variables
var command = process.argv[2];
var commandName = process.argv[3];



//cases based on user input
switch (command){

	case "my-tweets":
		tweets();
	break;

	case "spotify-this-song":
		spotify();
	break;

	case "movie-this":
		movie();
	break;

	case "do-what-it-says":
		doIt();
	break;
}

function tweets(){

	// We will add the command to the log file.
	fs.appendFile("log.txt", ", my-tweets" );

	var params = {screen_name: 'nodejs'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    console.log(tweets);
		    console.log(response);		    
		  }
	});


}

function spotify(){

	if (commandName === undefined){
		commandName = "The Sign";
	}

	// We will add the command to the log file.
	fs.appendFile("log.txt", ", spotify-this-song" + commandName );


	getSpotify.search({ type: 'track', query: commandName, limit: 1 }, function(err, data) {
	   
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    // console.log("JSON: " + JSON.stringify(data, null, 2));

	     var dataObject = JSON.stringify(data.tracks.items, null, 2);
	     var responses = data.tracks.items;

	     for(var i=0; i < responses.length; i++){

		    console.log("Artist(s): " + responses[i].artists[0].name);
		    console.log("Album Name: " + responses[i].album.name);
		    console.log("Song Name : " + responses[i].name);
		    console.log("Preview Link: " + responses[i].preview_url);
		    console.log("----------------------------------")
	   }
 	
});
}

function movie(){

	if (commandName === undefined){
		commandName = "Mr. Nobody";
	}

	// We will add the command to the log file.
	fs.appendFile("log.txt", ", movie-this" + commandName);


	var queryUrl = "http://www.omdbapi.com/?t=" + commandName + "&y=&plot=full&tomatoes=true&r=json";
		console.log("command name inside function3" + commandName);
	
		// Then create a request to the queryUrl
		request(queryUrl, function(error, response, body) {

		  // If the request is successful (i.e. if the response status code is 200)
		  if (!error && response.statusCode === 200) {
		  
		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Plot: " + JSON.parse(body).Plot);		    
		    console.log("Year Released: " + JSON.parse(body).Year);
		    console.log("Production Country: " + JSON.parse(body).Country);
		    console.log("Movie's Language: " + JSON.parse(body).Language);
		   	console.log("Actors: " + JSON.parse(body).Actors);
		   	console.log("IMDB Rating:  " + JSON.parse(body).imdbRating);
		   	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
		   	console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
		  }
		});

}

function doIt(){

	// We will add the command to the log file.
	fs.readFile("random.txt", "utf8", function(error, data) {

	  // Then split it by commas (to make it more readable)
	  var dataArr = data.split(",");

	  command = dataArr[0];
	  commandName = dataArr[1];

	
		switch (command){

			case "my-tweets":
				tweets();
			break;

			case "spotify-this-song":
				spotify();
			break;

			case "movie-this":
				movie();
			break;

			case "do-what-it-says":
				doIt();
			break;
		}


});


}
