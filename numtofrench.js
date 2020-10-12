module.exports = function(num, error) {
    num = parseInt(num);
    
    if( isNaN(num) ) {
        return(error(`${num} is not a number!`));
    }

    switch(num.toString().length) { // Amnt of digits
        case 1: // #
            return onesPlace(num);
        case 2: // ##
            return lengthTwo(num);
        case 3: // ###
            return lengthThree(num);
        case 4: // #,###
            return lengthFour(num);
        case 5: // ##,###
            return lengthFive(num);
        case 6: // ###,###
            return lengthSix(num);
        default:
            error(`${num} is too long!`);
    }

    function lengthTwo(numb) { // Num is 2 digits - 25
        let firDigit = numb.digit(1);
        
        if(firDigit == 1) { // 1#
            return teen(numb.digit(2));
        } 
        
        else
        
        if(firDigit >= 2 && firDigit <= 6) { // 2# - 6#
            if(numb.digit(2) == 0) return normTensPlace(firDigit); else
            if(numb.digit(2) == 1) return normTensPlace(firDigit)+"-et-un"; else
                                  return normTensPlace(firDigit)+"-"+onesPlace(numb.digit(2));
        }

        else

        if(firDigit == 7) { // 7#
            if(numb.digit(2) == 1) conjoiner = "-et-"; else
                                  conjoiner = "-";
            return "soixante"+conjoiner+teen(numb.digit(2));
        }

        else

        if(firDigit == 8) { // 8#
            if(numb.digit(2) == 0) return "quatre-vingts";
            if(numb.digit(2) == 1) return "quatre-vingt-et-un"; else
                                  return "quatre-vingt-"+onesPlace(numb.digit(2));
        }

        else

        if(firDigit == 9) { //9#
            return "quatre-vingt-"+teen(numb.digit(2));
        }
    }

    function lengthThree(numb) { // Num is 3 digits - 450
        let conjoiner = "-";
        let plural = false;
        if(numb.digit(2) == 0 && numb.digit(3) == 0) { // 1 sig fig - 400
            conjoiner = " ";
            if(numb.digit(1) != 1) plural = true;
        }

        let final = "";

        if(numb.digit(1) == 1) final = "cent"; else
                               final = onesPlace(numb.digit(1))+conjoiner+"cent"
        
        if(conjoiner == " ") return (plural) ? final+"s" : final; else final += "-";

        if(numb.digit(2) == 0) { // 405
            final += onesPlace(numb.digit(3));
            return final;
        } else { // 450
            let thisNum = addDigits(numb.digit(2), numb.digit(3));

            final += lengthTwo(thisNum);
            return final;
        }
        
    }

    function lengthFour(numb) {
        let final;
        if(numb.digit(1) == 1) final = "mille"; else
                               final = onesPlace(numb.digit(1))+"-mille";
        let lastThree = addDigits(numb.digit(2), numb.digit(3), numb.digit(4));

        if(lastThree == 0) return final;
        final += threeSegment(lastThree);

        return final;
    }

    function lengthFive(numb) {
        let final;

        final = lengthTwo( addDigits(numb.digit(1), numb.digit(2)) ) + "-mille";

        let lastThree = addDigits(numb.digit(3), numb.digit(4), numb.digit(5));

        if(lastThree == 0) return final;
        final += threeSegment(lastThree);

        return final;
    }

    function lengthSix(numb) {
        let final;

        final = lengthThree( addDigits(numb.digit(1), numb.digit(2), numb.digit(3)) ).replace(`cents`, `cent`) + "-mille";

        let lastThree = addDigits(numb.digit(4), numb.digit(5), numb.digit(6));

        if(lastThree == 0) return final;
        final += threeSegment(lastThree);

        final = final.replace(/ /g, `-`);

        return final;
    }

    function threeSegment(three) { // 1,234 the 234 bit
        let final = '';
        
        switch(three.toString().length) {
            case 3:
                final += "-"+lengthThree(three);
                break;
            case 2:
                final += "-"+lengthTwo(three);
                break;
            case 1:
                if(three == 1) final += "-et";
                final += "-"+onesPlace(three);
                break;
        }

        return final;
    }

    function onesPlace(digit) { // One digit - 0-9
        let numArray = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
        return numArray[digit];
    }

    function teen(digit) { // 10-19
        let numArray = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
        return numArray[digit];
    }

    function normTensPlace(digit) { // Two digits - 20-90
        let numArray = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt']
        return numArray[digit];
    }

    function addDigits(digit1, digit2, digit3) {
        let final;
        final = parseInt( digit1.toString() + digit2.toString() );
        if(digit3 || digit3 == 0) final = parseInt( final.toString() + digit3.toString() );
        return final;
    }
};

Number.prototype.digit = function(place) {
    //if(!Number.isSafeInteger(this)) throw `${this} is not an int!`;

    return parseInt( this.toString()[place - 1] );
}