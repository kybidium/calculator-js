//CURRENT GOALS: resolve any comments, make calculator look better, add keyboard input
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
        return display.textContent;
    }
}

// Object that stores a first number, second number, and operator
// Maybe should have a separate one??
const operationObject = {num1: '', num2: '', status: 'pre', operValue: null};

let display = document.querySelector('#display');

function calcFill() {
    //maybe improve logic
    if (operationObject.status == 'post') {
        operationObject.num1 = '';
        operationObject.num2 = '';
        display.textContent = this.textContent;
        operationObject.status = 'number';
        operatorsReset();
    } else if (!(operationObject.status == 'pre' | operationObject.status == 'operator' |
        operationObject.status == 'pause')) {
        display.textContent += this.textContent;
        return;
    }
    display.textContent = this.textContent;
    operationObject.status = 'number';
    operatorsReset();
}

// operator logic
function operatorHelper() {
    //need to clean this logic wayyy more
    if (this.id == "equals") {
        equalsHelper();
    } else if (operationObject.status == 'pause') {
        return;
        //maybe change these num1/num2 checks so they rely entirely on status
    } else if (operationObject.num1 != '' && 
        operationObject.num2 != '' && operationObject.status != 'post'|| operationObject.num1 != '' && 
        operationObject.num2 == '' && operationObject.status == 'number') {
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
    if (this.id != "equals") {
        operationObject.operValue = this.textContent;
        this.style.color = 'white'
        this.style['background-color'] = 'orange';
    }
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
    if (operationObject.status == 'post') {
        return;
    }
    operationObject.num2 = 1*display.textContent;
    display.textContent = operate(operationObject.num1, operationObject.num2,
        operationObject.operValue);
    operationObject.status = 'post';
}

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

clear = document.querySelector('#clear');
clear.addEventListener('click', clearHelper);

const numButtons = document.querySelectorAll('.num');
numButtons.forEach(button => button.addEventListener('click', calcFill));
const buttons = document.querySelectorAll('button');

//turn the buttons black when the mouse is held down
buttons.forEach(button => button.addEventListener('mousedown', function(e) {
        button.style.backgroundColor = 'black';
        button.style.color = 'white';
    }
));
//return the buttons to normal color when it is lifted
buttons.forEach(button => button.addEventListener('mouseup', function() {
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
}))