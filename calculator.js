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

// Object that stores a first number, second number, and operator
// Maybe should have a separate one??
const operationObject = {status: 'pre'};

let display = document.querySelector('#display');

function calcFill() {
    if (operationObject.status == 'pre' | operationObject.status == 'post' | 
        operationObject.status == 'operator') {
        display.textContent = this.textContent;
        operationObject.status = 'number';
    } else {
        display.textContent += this.textContent;
    }
}

function setOperator() {
    operationObject.num1 = 1*document.querySelector('#display').textContent;
    operationObject.operValue = this.textContent;
    operationObject.status = 'operator'; //wait till next num input
}

let operators = document.querySelectorAll('.operator')
for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', setOperator);
}

function operateHelper() {
    operationObject.num2 = 1*display.textContent;
    display.textContent = operate(operationObject.num1, operationObject.num2,
        operationObject.operValue);
}
let equals = document.querySelector('#equals')
equals.addEventListener('click', operateHelper)


const numButtons = document.querySelectorAll('.num');
for (let i = 0; i < 10; i++) {
    numButtons[i].addEventListener('click', calcFill);
}