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
    } else if (operValue == "x" || operValue == "*") {
        return multiply(num1, num2);
    } else if (operValue == "/") {
        return divide(num1, num2);
    } else {
        return display.textContent;
    }
}

// Object that stores a first number, second number, and operator
// Maybe should have a separate one??
const operationObject = {dispVal: '', num1: '', num2: '', status: 'pre', operValue: null,
    pause: false};

let display = document.querySelector('#display');

function calcFillHelper(numText) {
    //maybe improve logic
    if (operationObject.status == 'post') {
        operationObject.num1 = '';
        operationObject.num2 = '';
        display.textContent = numText;
        operationObject.status = 'number';
    } else if (!(operationObject.status == 'pre' | operationObject.status == 'operator' |
        operationObject.pause == true)) {
        display.textContent += numText;
    } else {
        display.textContent = numText;
        operationObject.status = 'number';
    }
    operationObject.dispVal = display.textContent;
    operationObject.pause = false;
}

function calcFill() {
    calcFillHelper(this.textContent)
}


// operator logic
function operatorHelper(operatorText) {
    if (operatorText == "=") {
        equalsHelper();
        return;
    } else {
        operationObject.operValue = operatorText;
    }
    if (operationObject.pause == true) {
        return;
    } else if (operationObject.num1 == '' || operationObject.status == 'number'
    && operationObject.num2 != ''|| operationObject.status == 'operator' && operationObject.num2 == ''
    || operationObject.status == 'post') {
        operationObject.num1 = 1*operationObject.dispVal;
        operationObject.dispVal = '';
        operationObject.status = 'operator';
    } else if (operationObject.num2 != '' && operationObject.status != 'post'|| 
        operationObject.status == 'number') {
        operationObject.num2 = 1*operationObject.dispVal;
        display.textContent = operate(operationObject.num1, operationObject.num2,
            operationObject.operValue);
        operationObject.dispVal = display.textContent;
        operationObject.num1 = 1*operationObject.dispVal;
        operationObject.num2 = '';
        operationObject.pause = true;
    }
}

function operateKey() {
    operatorHelper(this.textContent);
}

const operators = document.querySelectorAll('.operator')
operators.forEach(operator => operator.addEventListener('click', operateKey));

// equal button logic
function equalsHelper() {
    if (operationObject.status == 'post' || operationObject.num1 == '' ||
    operationObject.status == 'operator' && operationObject.num2 == '' ||
    operationObject.pause == true || operationObject.dispVal == '') {
        return;
    }
    operationObject.num2 = 1*display.textContent;
    display.textContent = operate(operationObject.num1, operationObject.num2,
        operationObject.operValue);
    operationObject.status = 'post';
    operationObject.dispVal = display.textContent;
}

// clear button logic
function clearHelper() {
    if (operationObject.status == 'post' || operationObject.status == 'operator' 
        || display.textContent == '') {
        display.textContent = '';
        operationObject.dispVal = '';
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

//add listeners for changing display to number buttons
const numButtons = document.querySelectorAll('.num');
numButtons.forEach(button => button.addEventListener('click', calcFill));

const buttons = document.querySelectorAll('button');
//turn the buttons black when the mouse is held down
buttons.forEach(button => button.addEventListener('mousedown', function() {
        button.style.backgroundColor = 'black';
        button.style.color = 'white';
    }
));
//return the buttons to normal color when it is lifted
buttons.forEach(button => button.addEventListener('mouseup', function() {
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
}))

const acceptedKeyObject = {};
//maybe create another object for the acceptedKeyObject's stored values
numButtons.forEach(button => acceptedKeyObject[button.textContent] = [button.textContent, 'number']);
operators.forEach(button => acceptedKeyObject[button.id] = [button.id, 'operator']);
acceptedKeyObject['c'] = ['clear']
acceptedKeyObject['Enter'] = ['equals']

document.addEventListener("keydown", (event) => {
    let keyVal = acceptedKeyObject[event.key];
    if (keyVal == undefined)
        return;
    if (keyVal[0] == 'clear') {
        clearHelper();
    } else if (keyVal[0] == 'equals') {
        equalsHelper();
    } else if (keyVal[1] == 'number') {
        calcFillHelper(event.key);
    } else if (keyVal[1] == 'operator') {
        operatorHelper(event.key);
    }
});

//turn the buttons black when the mouse is held down
document.addEventListener('keydown', function(event) {
    let keyVal = acceptedKeyObject[event.key];
    if (keyVal == undefined)
        return;
    console.log(keyVal, keyVal[0], keyVal[1]);
    let keyBtn = document.getElementById(keyVal[0]);
    keyBtn.style.backgroundColor = 'black';
    keyBtn.style.color = 'white';
});
//return the buttons to normal color when it is lifted
document.addEventListener('keyup', function(event) {
    let keyVal = acceptedKeyObject[event.key];
    if (keyVal == undefined)
        return;
    let keyBtn = document.getElementById(keyVal[0]);
    keyBtn.style.backgroundColor = 'white';
    keyBtn.style.color = 'black';
});