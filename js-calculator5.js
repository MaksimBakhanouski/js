var digit1;
var digit2;
var sign;
var strDigit = "";
var ratio = 1;
function buttonPress(val, flagDigit) {

    elem = document.querySelector(".calculator__input");
    if (elem.value === "Error") {
        elem.value = ""
        variablesClear();
    }
    elem.value += val;

    if (flagDigit === 2) {
        elem = document.querySelector(".calculator__input");
        elem.value = "";
        variablesClear();
        return;
    }

    if (flagDigit === 0 && val === "=") {
        if (strDigit !== "") {
            digit2 = parseFloat(strDigit);
            if (digit1 !== undefined && digit2 !== undefined && sign !== undefined) {
                elem = document.querySelector(".calculator__input");
                value = calculate();
                if (value !== Infinity && value !== NaN && value !== null) {
                    elem.value = value;
                }
                else { elem.value = "Error" }

                variablesClear();
                digit1 = parseFloat(elem.value);
                return;
            }
        }
        else {
            if (digit1 !== undefined) {
                elem = document.querySelector(".calculator__input");
                elem.value = parseFloat(digit1);
            }
        }
    }

    if (flagDigit === 0) {

        if (sign === undefined) {
            sign = val;
        }

        if (digit1 === undefined) { ratio = -1; }

        if (strDigit !== "") {
            if (digit1 === undefined) {
                digit1 = parseFloat(strDigit) * ratio;
                ratio = 1;
            }
            else { digit2 = parseFloat(strDigit); }
            strDigit = "";

        }

        console.log("digit1 " + digit1);
        console.log("digit2 " + digit2);
        console.log("strDigit " + strDigit);


        if (digit1 !== undefined && digit2 !== undefined) {
            digit1 = calculate();
            digit2 = undefined;
            strDigit = "";
        }
        sign = val;

        console.log("digit1 " + digit1);
        console.log("digit2 " + digit2);
        console.log("strDigit " + strDigit);

    }


    if (flagDigit === 1) {
        if (val === ".") {
            if (strDigit.indexOf(".") === -1) {
                if (strDigit === "") {
                    strDigit += "0";
                }
                strDigit += val;
            }
        }
        else { strDigit += val; }

        console.log("digit1 " + digit1);
        console.log("digit2 " + digit2);
        console.log("sign " + sign);
        console.log("strDigit " + strDigit);
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