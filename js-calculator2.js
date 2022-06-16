var digit1;
var digit2;
var sign;
var strDigit = "";
function buttonPress(val, flagDigit) {

    elem = document.querySelector(".calculator__input");
    if (elem.value === "NaN" || elem.value === "Infinity") {
        elem.value = ""
        variablesClear();
    }

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
                elem.value = calculate();
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

        if (strDigit !== "") {
            if (digit1 === undefined) {
                digit1 = parseFloat(strDigit);
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