var Letter = function (char) {
    this.char = char;
    this.beenGuessed = false;

    this.printLetter = function () {
        var val = this.char.toUpperCase().charCodeAt(0);

        if (this.beenGuessed || !(val > 64 && val < 91)) {
            return this.char;
        } else {
            return "_";
        }
    };

    this.guessLetter = function (c) {
        if (c.toUpperCase() === this.char.toUpperCase()) {
            this.beenGuessed = true;
        }
    }
}

module.exports = Letter;