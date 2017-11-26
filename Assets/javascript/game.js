$(document).ready(function(){
    $('#wordToGuess').focus();


// Global Variables
// --------------------------------------

// Arrays and Variables


var teams = ["broncos", "patriots", "texans", "cowboys", "raiders",
             "eagles", "giants", "seahawks", "steelers", "packers",
             "49ers", "bears", "vikings", "panthers", "browns", "rams",
             "chiefs", "redskins", "falcons", "ravens", "lions", "jets",
             "chargers", "cardinals", "bills", "saints", "dolphins", "jaguars",
             "bengals", "buccaneers", "colts", "titans"];

var selectedTeam = "";
var lettersInWord =[];
var numBlanks = 0;
var numBlanksAndSuccesses = [];
var wrongLetters = [];


// Game Counters

var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;






// Functions
// -------------------------------------
function FocusMain()
{
    $("#main").focus();
}

function startGame() {
    selectedTeam = teams[Math.floor(Math.random() * teams.length)];
    lettersInWord = selectedTeam.split("");
    numBlanks = lettersInWord.length;

        // Reset

    guessesLeft = [];
    wrongLetters = [];
    numBlanksAndSuccesses = [];
    guessesLeft =9;


    // Populate numBlanksAndSuccesses with right number of blanks and successes
    for(var i = 0; i < numBlanks; i++){
        numBlanksAndSuccesses.push("_");
    }

    // Change html to reflect game round conditions

    document.getElementById("wordToGuess").innerHTML = numBlanksAndSuccesses.join("  ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;


    // Test
    console.log(selectedTeam);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(numBlanksAndSuccesses);


}


//Checks if user entry matches any letters from the wordToGuess

function checkLetters(letter) {
    //checks if letter exists in word


    var ifLetterExists = false;
    for(var i = 0; i < numBlanks; i++) {
        if(selectedTeam[i] == letter){
            ifLetterExists = true;
        }
    }
    //check where in the word the letter exist and populate blankandsuccessesarray
    if (ifLetterExists) {
        for(var i = 0; i < numBlanks; i++) {
        if(selectedTeam[i] == letter) {
            numBlanksAndSuccesses[i] = letter;
          }
      }
  }
    //letter wasn't found
    else{
        wrongLetters.push(letter);
        guessesLeft --;
        // alert(guessesLeft);
    }

    //testing and debugging

    console.log(numBlanksAndSuccesses);

}


function roundComplete() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);


    //Update html to reflect the most recent countstats

    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById('wordToGuess').innerHTML = numBlanksAndSuccesses.join(' ');
    document.getElementById('wrongGuesses').innerHTML = wrongLetters.join(' ');


    // check if user won

    if(lettersInWord.toString() == numBlanksAndSuccesses.toString()) {
        winCount++;
        alert("You Won!");

        // Update html

        document.getElementById("winCounter").innerHTML = winCount;


        startGame();
    }

    else if (guessesLeft <= 0) {
        lossCount++;
        alert("You Lost");
        alert("The correct team was " + selectedTeam + "!");

        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();
    }
}




// Main Process
// ---------------------------------------
// Initiates code for the first time
startGame();
checkLetters();


//How to register Key strokes

document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();

    console.log(letterGuessed);

}

});











