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

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequnecy = "";

$("#tSubmit").on("click", function (event) {
    event.preventDefault();
    // Grabbed values from text-boxes
    trainName = $("train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#first-train").val().trim();
    frequnecy = $("#frequency").val().trim();