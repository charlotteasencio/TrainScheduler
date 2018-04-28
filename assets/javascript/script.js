  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAlN7k6f2VjyFVvVwRSEjAPIPPkS6f5n0A",
    authDomain: "train-scheduler-52dfd.firebaseapp.com",
    databaseURL: "https://train-scheduler-52dfd.firebaseio.com",
    projectId: "train-scheduler-52dfd",
    storageBucket: "train-scheduler-52dfd.appspot.com",
    messagingSenderId: "525135884088"
  };

  firebase.initializeApp(config);

var database = firebase.database();
  
  // 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirst = $("#first-train").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTime: trainFirst,
      frequency: trainFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTime;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirst);
    console.log(trainFrequency);

    var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");

    var currentTime = moment();

    var differenceTime = moment().diff(moment(firstTimeConverted), "minutes");

    var remainder = differenceTime % trainFrequency;

    var minutesAway = trainFrequency - remainder;


    var nextTrain = moment().add(minutesAway, "minutes");

    var convertNextTrain = (nextTrain).format("hh:mm A");


    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + convertNextTrain + "</td><td>" + minutesAway + "</td><td>");
  });
  