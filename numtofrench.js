module.exports = function(num) {
    num = parseInt(num);
    
    if( isNaN(num) ) {
        throw `${num} is not a number!`;
    }

    switch(num.toString().length) { // Amnt of digits
        case 1:
            return onesPlace(num);
        case 2:
            return lengthTwo();
        case 3:
            return lengthThree();
        default:
            throw `${num} is too long!`;
    }

    function lengthTwo() { // Num is 2 digits
        let firDigit = num.digit(1);
        
        if(firDigit == 1) { // 1#
            return teen(num.digit(2));
        } 
        
        else
        
        if(firDigit >= 2 && firDigit <= 6) { // 2# - 6#
            if(num.digit(2) == 0) return normTensPlace(firDigit); else
            if(num.digit(2) == 1) return normTensPlace(firDigit)+"-et-un"; else
                                  return normTensPlace(firDigit)+"-"+onesPlace(num.digit(2));
        }

        else

        if(firDigit == 7) {
            if(num.digit(2) == 1) conjoiner = "-et-"; else
                                  conjoiner = "-";
            return "soixante"+conjoiner+teen(num.digit(2));
        }

        else

        if(firDigit == 8) {
            if(num.digit(2) == 0) return "quatre-vingts";
            if(num.digit(2) == 1) return "quatre-vingt-et-un"; else
                                  return "quatre-vingt-"+onesPlace(num.digit(2));
        }

        else

        if(firDigit == 9) {
            return "quatre-vingt-"+teen(num.digit(2));
        }
    }

    function onesPlace(digit) { // One digit
        let numArray = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
        return numArray[digit];
    }

    function teen(digit) {
        let numArray = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
        return numArray[digit];
    }

    function normTensPlace(digit) {
        if(!(digit >= 2 && digit <= 6)) throw `${digit}# is not a normal tens place!`;
        let numArray = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante']
        return numArray[digit];
    }
};

Number.prototype.digit = function(place) {
    //if(!Number.isSafeInteger(this)) throw `${this} is not an int!`;

    return parseInt( this.toString()[place - 1] );
}