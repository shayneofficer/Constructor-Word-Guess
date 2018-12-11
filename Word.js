var Letter = require("./Letter");

var Word = function (word) {
    this.word = word;
    this.letters = [];

    for (var i = 0; i < word.length; i++) {
        this.letters.push(new Letter(word[i]));
    }

    this.printWord = function () {
        var str = "";
        for (var i = 0; i < this.letters.length; i++) {
            str += this.letters[i].printLetter() + " ";
        }
        return str + "\n";
    }

    this.guess = function (c) {
        for (var i = 0; i < this.letters.length; i++) {
            this.letters[i].guessLetter(c);
        }
    }
}

module.exports = Word;