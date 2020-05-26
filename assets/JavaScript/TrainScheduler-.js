var firebaseConfig = {
    apiKey: "AIzaSyCXZVeG0vdRdxoJkwPvP3HCqSolLUL8DE0",
    authDomain: "trainscheduler-d563a.firebaseapp.com",
    databaseURL: "https://trainscheduler-d563a.firebaseio.com",
    projectId: "trainscheduler-d563a",
    storageBucket: "trainscheduler-d563a.appspot.com",
    messagingSenderId: "761784980312",
    appId: "1:761784980312:web:acdfc72640a195670e8b2d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// var trainName = "";
// var destination = "";
// var firstTrainTime = parseInt("");
// var frequency = "";


// below converts to military time
// var time = moment("02:30 PM", "hh:mm A").format("HH:hh")
// console.log(time);


$("#tSubmit").on("click", function (event) {
    event.preventDefault();
    // Grabbed values from text-boxes
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        dbtrainName: trainName,
        dbdestination: destination,
        dbfirstTrainTime: firstTrainTime,
        dbfrequency: frequency,

    };
    //upload new train data to database
    database.ref().push(newTrain);
    // log to console
    console.log(newTrain.dbtrainName);
    console.log(newTrain.dbdestination);
    console.log(newTrain.dbfirstTrainTime);
    console.log(newTrain.dbfrequency);


    // clear text boxes


    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");

});

//create Firebase event for adding train to database and row in chart in html when input is added
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val())

    //store snapshots in variables

    var trainName = childSnapshot.val().dbtrainName;
    var destination = childSnapshot.val().dbdestination;
    var firstTrainTime = childSnapshot.val().dbfirstTrainTime;
    var frequency = childSnapshot.val().dbfrequency;

    // train data
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    //calculate next arrival
    var nextArrival = moment(firstTrainTime, "HH:mm").from(moment(frequency, "m"));
    nextArrival = moment().format("HH:mm");
    console.log("Next arrival: " + nextArrival);
    //calculate how many mins until next train
    
    var minsArrive = nextArrival - frequency;
    console.log("Minutes until next train: " + minsArrive);
    //create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrainTime),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minsArrive),
    );
      //putting new row into table
      $("#train-table").append(newRow);

    //   function to run an error message
    }, function(errorObject) {
        console.log("Errors handled:" + errorObject.code);

});