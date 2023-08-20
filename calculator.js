//calculator functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

// variables for any calculator operation
let number1;
let number2;
let operator;

function operate(num1, num2, operValue) {
    if (operValue == "+") {
        return add(num1, num2);
    } else if (operValue == "-") {
        return subtract(num1, num2);
    } else if (operValue == "x") {
        return multiply(num1, num2);
    } else if (operValue == "/") {
        return divide(num1, num2);
    } else {
        return "Invalid Operator";
    }
}

const display = document.querySelector('#display');

function calcFill(event) {
    const display += `${event.target.text}`;
}

const numButtons = {}
for (let i = 0; i < 10; i++) {
    numButtons[i] = document.querySelectorAll('.num')[i];
    numButtons[i].addEventListener('click', calcFill(e));
}