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

$(document).ready(function() {
  updateTime();
  setInterval(updateTime, 1000);
});

//Button for Adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  //It should grab the user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var trainDestination = $("#destination-input")
    .val()
    .trim();
  var trainTime = $("#train-time-input")
    .val()
    .trim();
  var trainFrequency = parseInt(
    $("#frequency-input")
      .val()
      .trim()
  );
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
database.ref().on(
  "child_added",
  function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    //Timing... Calculate Time Between Train and Now (train arrival)
    var timeConverted = moment(trainTime, "HH:mm");
    console.log("Time converted: " + timeConverted);
    var timeDiff = moment().diff(moment(timeConverted), "minutes");
    console.log("Difference in time: " + timeDiff);
    var remainder = timeDiff % trainFrequency;
    console.log("Remainder: " + remainder);
    var minutesAway = trainFrequency - remainder;
    console.log("Minutes away: " + minutesAway);
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextArrival = moment(nextTrain).format("HH:mm");
    console.log("Next arrival: " + nextArrival);

    //Displaying train information in the table
    $("#new-train").append(
      "<tr><td>" +
        trainName +
        "</td><td>" +
        trainDestination +
        "</td><td>" +
        "Every " +
        trainFrequency +
        " min" +
        "</td><td>" +
        nextArrival +
        "</td><td>" +
        minutesAway +
        " min" +
        "</td></tr>"
    );
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
// updates the schedule every minute
setInterval(function() {
  location.reload(true);
}, 60000);
