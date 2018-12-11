const inquirer = require("inquirer");
var Word = require("./Word");
const colors = require("colors");
var wordChoices = require("./word-choices");

var hangmanWord;
var guesses = [];
var remaining = 10;

function resetGame() {
    var choice = wordChoices[Math.floor(Math.random() * wordChoices.length)];
    hangmanWord = new Word(choice);
    guesses = [];
    remaining = 10;
    console.log(hangmanWord.printWord());
    playGame();
}

resetGame();

function playGame() {
    inquirer.prompt([
        {
            type: "input",
            message: "Guess a letter!\n",
            name: "guess"
        }
    ]).then((answer) => {
        if (answer.guess.length > 1 || answer.guess.length === 0 || answer.guess.toUpperCase().charCodeAt(0) > 90 || answer.guess.toUpperCase().charCodeAt(0) < 65) {
            console.log("Bad input!".red);
        } else if (guesses.includes(answer.guess)) {
            console.log("You already guessed that.\n".blue);
        } else {
            guesses.push(answer.guess);
            hangmanWord.guess(answer.guess);
            console.log(hangmanWord.printWord());
            if (hangmanWord.word.toUpperCase().includes(answer.guess.toUpperCase())) {
                console.log("Correct!\n".green);
            } else {
                remaining--;
                console.log(`Incorrect! ${remaining} guesses left.\n`.red);
            }
        }

        if (remaining === 0) {
            console.log("You lose! :-(\n".red);
            offerRematch();
        } else if (hangmanWord.printWord().includes("_")) {
            playGame();
        } else {
            console.log("You win! :-)\n".america);
            offerRematch();
        }
    }).catch((err) => {
        console.log(err);
    });
}

function offerRematch() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Want to play again?\n",
            name: "rematch"
        }
    ]).then((ans) => {
        if (ans.rematch) {
            resetGame();
        } else {
            console.log("Goodbye!".blue);
        }
    }).catch((err) => {
        console.log(err);
    });
}
