// Initialize Firebase
var config = {
  apiKey: "AIzaSyDt485IpaMqi51YqWDKe1fNXxTcYoaCLao",
  authDomain: "train-scheduler-df993.firebaseapp.com",
  databaseURL: "https://train-scheduler-df993.firebaseio.com",
  projectId: "train-scheduler-df993",
  storageBucket: "train-scheduler-df993.appspot.com",
  messagingSenderId: "388090364657"
};
firebase.initializeApp(config);


var database = firebase.database();

//Display Current Time
var currentTime = null;

function updateTime() {
  currentTime = moment().format("HH:mm:ss");
  $("#currentTime").html(currentTime);
}

$(document).ready(function () {
  updateTime();
  setInterval(updateTime, 1000);
});

//Button for Adding Trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  //It should grab the user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = $("#train-time-input").val().trim();
  var trainFrequency = parseInt($("#frequency-input").val().trim());
  //storing Train Data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

  //Upload the Train Data to Firebase
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // clears all of the text boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");

  // prevents loading a new page
  return false;
});
//Add an HTML row of the train
//Timing... Calculate Time Between Train and Now (train arrival)
//Displaying train information in the table
//Update schedule every ... 38 seconds