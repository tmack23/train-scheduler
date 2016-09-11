
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCGwVPFU13V-T82-XqRZrRbYLw1cslVKug",
    authDomain: "train-scheduler-cd212.firebaseapp.com",
    databaseURL: "https://train-scheduler-cd212.firebaseio.com",
    storageBucket: "train-scheduler-cd212.appspot.com",
  };
 
  		firebase.initializeApp(config);

	var database = firebase.database();


	$("#addButton").on("click", function(){

	// Grabs user input
	var trainName = $("#nameInput").val().trim();
	var destination = $("#destInput").val().trim();
	var trainTime = $("#timeInput").val().trim();
	var frequency = $("#freqInput").val().trim();

	// Creates local "temporary" object for holding employee data
	var newTrain = {
		name:  trainName,
		dest: destination,
		time: trainTime,
		freq: frequency
	};

	// Uploads employee data to the database
	database.ref().push(newTrain);


	


	// Clears all of the text-boxes
	$("#nameInput").val("");
	$("#destInput").val("");
	$("#timeInput").val("");
	$("#freqInput").val("");

	// Prevents moving to new page
	return false;
});


	// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().dest;
	var trainTime = childSnapshot.val().time;
	var frequency = childSnapshot.val().freq;

	// Employee Info
	console.log(trainName);
	console.log(destination);
	console.log(trainTime);
	console.log(frequency);


newTime = trainTime;
console.log(newTime);

/*train arrival/away*/

		
		var tRemainder = newTime % frequency;
		console.log(tRemainder);

		// Minute Until Train
		var tillTrain = frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + moment(tillTrain).format("minutes"));

		// Next Train
		var nextTrain = moment().add(tillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"))


	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + 
	"</td><td>" + nextTrain + "</td><td>" + tillTrain + "</td></tr>");

});