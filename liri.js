// use 'strict';


//movie api variable, import npm request pkg
var request = require("request");

//spotify api variable, import npm spotify pkg
var getSpotify = require("spotify");

//fs package import
var fs = require("fs");

//Twitter Api Variables, , import npm request pkg and keys
var TwittwerImport = require("./key.js");
var Twitter = require("twitter");
var client = new Twitter(TwittwerImport.twitterKeys);


//user input variables
var command = process.argv[2];
var array = process.argv;
var commandName = "";

//loop through the array of input, so i =>3 will be combine together and use as the second argument
for (var i=3; i < array.length; i++){

	commandName = (commandName + " " + array[i]).trim();
}

//switch case statement to scheck what if the first targument
function execute(){

//cases based on the first user input (argument)
switch (command){

	//if the first argument is
	case "my-tweets":

		//call the function
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
	default:
		console.log("Sorry, we do not recognize this command. Please enter something else!");
	break;
}
}
//in case the first argument is "my-tweets"
function tweets(){

	// We will add the command to the log file.
	fs.appendFile("log.txt", "\nmy-tweets" );

	//define the user id of the account to access
	var params = {user_id: '775085593'};

	//call the twitter api
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  
		  //if there is no error
		  if (!error) {

		  	//foor loop to loop through the result
			for (var i=0; i<20; i++){

			  	//to show the first 20 tweets
			  	console.log(tweets[i].text);
			  	console.log("--------------------------------");
		    }

		  }else{

		  	//if there is an error, show the error response
		  	console.log(error);
		  }
	});

}

//if the first argument is "spotify-this-song"
function spotify(){

	//if the user did not enter the second command, define it to "The Sign"
	if (commandName === ""){
		commandName = "The Sign";
	}

	// We will add the command to the log file.
	fs.appendFile("log.txt", "\nspotify-this-song " + commandName );

	//call the spotify api, using the second argument as the search term
	getSpotify.search({ type: 'track', query: commandName, limit: 1 }, function(err, data) {
	   
	    //if there is an error to show
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    //local variables for the path of the returned result
	    var responses = data.tracks.items;

	    //for loop to loop through the 20 results returned
	    for(var i=0; i < responses.length; i++){

		    console.log("Artist(s): " + responses[i].artists[0].name);
		    console.log("Album Name: " + responses[i].album.name);
		    console.log("Song Name : " + responses[i].name);
		    console.log("Preview Link: " + responses[i].preview_url);
		    console.log("----------------------------------");
	   	}
 	
});
}

//if the first argument is "movie-this"
function movie(){
	
	//if the user did not enter the second command, define it to "Mr. No Body"
	if (commandName === ""){
		commandName = "Mr. Nobody";
	}

	// We will add the command to the log file.
	fs.appendFile("log.txt", "\nmovie-this" + commandName);

	//set a variable for the queryurl, using second argument as the search term
	var queryUrl = "http://www.omdbapi.com/?t=" + commandName + "&y=&plot=full&tomatoes=true&r=json";
	
		// Then create a request to the queryUrl
		request(queryUrl, function(error, response, body) {

		 	// If the request is successful (i.e. if the response status code is 200)
		  	if (!error && response.statusCode === 200) {
		  	
		  		//to show
		  		console.log("--------------------------------------------------------");
		    	console.log("Title: " + JSON.parse(body).Title);
		    	console.log("Plot: " + JSON.parse(body).Plot);		    
		    	console.log("Year Released: " + JSON.parse(body).Year);
		    	console.log("Production Country: " + JSON.parse(body).Country);
		    	console.log("Movie's Language: " + JSON.parse(body).Language);
		   		console.log("Actors: " + JSON.parse(body).Actors);
		   		console.log("IMDB Rating:  " + JSON.parse(body).imdbRating);
		   		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
		   		console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
		  		console.log("--------------------------------------------------------");
		  
		 	}
		});

}

//if the first argument is "do-what-it-says"
function doIt(){

	// We will add the command to the log file.
	fs.readFile("random.txt", "utf8", function(error, data) {

	// Then split it by commas (to make it more readable)
	var dataArr = data.split(",");

		//reset the variable to the index 0 and index 1 in the array
	  	command = dataArr[0];
	  	commandName = dataArr[1];

		//the check to see what variable command is, the call the appropreaite function
		execute();

	});
}

//the check to see what variable command is, the call the appropreaite function
execute();
