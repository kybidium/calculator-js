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
    if (num2 == 0) {
        return "YOU CANNOT DIVIDE BY ZERO"
    }
    return num1 / num2;
}

// variables for any calculator operation
let number1;
let number2;
let operator;

function operate(num1, num2, operValue) {
    //design: if screen overflows, truncate/round to certain place
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
const operationObject = {num1: '', num2: '', status: 'pre'};

let display = document.querySelector('#display');

function calcFill() {
    if (operationObject.status == 'pre' | operationObject.status == 'post' | 
        operationObject.status == 'operator' | operationObject.status == 'pause') {
        display.textContent = this.textContent;
        operationObject.status = 'number';
        operatorsReset();
    } else {
        display.textContent += this.textContent;
    }
}

// operator logic
function operatorHelper() {
    //need to clean this logic more
    if (operationObject.status == 'pause') {
        return;
    } else if (operationObject.num1 != '' && operationObject.num2 != ''
        || operationObject.num1 != '' && operationObject.num2 == '' &&
        operationObject.status == 'number') {
        operationObject.num2 = 1*display.textContent;
        display.textContent = operate(operationObject.num1, operationObject.num2,
            operationObject.operValue);
        operationObject.num1 = 1*display.textContent;
        operationObject.num2 = '';
        operationObject.status = 'pause';
    } else if (operationObject.num1 != '' && operationObject.num2 == '' &&
        operationObject.status != 'operator') {
            operationObject.status = 'pause';
    } else {
        operationObject.num1 = 1*display.textContent;
        operationObject.status = 'operator'; //wait till next num input
    }
    operationObject.operValue = this.textContent;
    this.style.color = 'white'
    this.style['background-color'] = 'black';
}

function operatorsReset() {
    operators.forEach(function(operator) {
        operator.style.color = 'black';
        operator.style['background-color'] = 'white';
    });
}
let operators = document.querySelectorAll('.operator')
operators.forEach(operator => operator.addEventListener('click', operatorHelper));

// equal button logic
function equalsHelper() {
    operationObject.num2 = 1*display.textContent;
    display.textContent = operate(operationObject.num1, operationObject.num2,
        operationObject.operValue);
    operationObject.status = 'post';
}

let equals = document.querySelector('#equals');
equals.addEventListener('click', equalsHelper);

// clear button logic
function clearHelper() {
    if (operationObject.status == 'post' || operationObject.status == 'operator' 
        || display.textContent == '') {
        display.textContent = '';
        operationObject.num1 = '';
        operationObject.num2 = '';
        operationObject.status = 'post';
    } else {
        operationObject.num2 = '';
        display.textContent = operationObject.num1;
        operationObject.status = 'operator';
    }
}

// CLEAR SHOULDNT CLEAR EVERYTHING!!!!!! JUST THE CURRENT VALUE!!!! FIX THIS
clear = document.querySelector('#clear');
clear.addEventListener('click', clearHelper);

const numButtons = document.querySelectorAll('.num');
numButtons.forEach(button => button.addEventListener('click', calcFill));