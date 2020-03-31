$(document).ready(function () {

    // Initialize Firebase
    var Config = {
        apiKey: "AIzaSyCsJRwWW0rZ7uy_4tDBQRabUrbdEy7MqHI",
        authDomain: "trainscheduler-c3bb6.firebaseapp.com",
        databaseURL: "https://trainscheduler-c3bb6.firebaseio.com",
        projectId: "trainscheduler-c3bb6",
        storageBucket: "trainscheduler-c3bb6.appspot.com",
        messagingSenderId: "708849587455",
      };
     
      firebase.initializeApp(Config);
      
      var database = firebase.database();
  
    // Capture Button Click
    $("#addTrain").on("click", function (event) {
      event.preventDefault();
  
      // store and getting train data
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var frequency = $("#interval").val().trim();
  
      // push to database
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
      });

    });
  
  
   
    database.ref().on("child_added", function (childSnapshot) {
      var nextArr;
      var minAway;
      // Chang year so first train comes before now
      var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
      // Difference between the current and firstTrain
      var diffTime = moment().diff(moment(firstTrainNew), "minutes");
      var remainder = diffTime % childSnapshot.val().frequency;
      // Minutes until next train
      var minAway = childSnapshot.val().frequency - remainder;
      // Next train time
      var nextTrain = moment().add(minAway, "minutes");
      nextTrain = moment(nextTrain).format("hh:mm");

      $("#add-row").append("<tr><td>" + childSnapshot.val().name +
              "</td><td>" + childSnapshot.val().destination +
              "</td><td>" + childSnapshot.val().frequency +
              "</td><td>" + nextTrain + 
              "</td><td>" + minAway + "</td></tr>");
      
    });

});
      

    
  
