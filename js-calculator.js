var digit1;
var digit2;
var sign;
var strDigit = "";
function buttonPress(val, flagDigit) {
    if (flagDigit === 2) {
        elem = document.querySelector(".calculator__input");
        elem.value = "";
        variablesClear();
        return;
    }

    if (flagDigit === 0 && val === "=") {
        digit2 = parseFloat(strDigit);
        if (digit1 !== undefined && digit2 !== undefined && sign !== undefined) {
            elem = document.querySelector(".calculator__input");
            elem.value = calculate();
            variablesClear();
            digit1 = parseFloat(elem.value);
            return;
        }
    }

    if (flagDigit === 0) {
        sign = val;

        if (strDigit !== "") {
            if (digit1 === undefined) {
                digit1 = parseFloat(strDigit);
            }
            else { digit2 = parseFloat(strDigit); }
            strDigit = "";

        }

        console.log(digit1);
        console.log(digit2);


        if (digit1 !== undefined && digit2 !== undefined) {
            digit1 = calculate();                    
            digit2 = undefined;                    
            strDigit = "";
            return;
        }

        console.log(digit1);
        console.log(digit2);

    }


    if (flagDigit === 1) {
        if (val === ".") {
            if (strDigit.indexOf(".") === -1) {                       
                strDigit += val;
            }
        }
        else { strDigit += val; }

        console.log(digit1);
        console.log(digit2);
        console.log(sign);
        console.log(strDigit);
    }
}

function variablesClear() {
    digit1 = undefined;
    digit2 = undefined;
    sign = undefined;
    strDigit = "";
}

function calculate() {
    if (sign === "/") {
        return digit1 / digit2;
    }
    if (sign === "*") {
        return digit1 * digit2;
    }
    if (sign === "+") {
        return digit1 + digit2;
    }
    if (sign === "-") {
        return digit1 - digit2;
    }
}