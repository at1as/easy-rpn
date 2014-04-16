var inputBuffer = new Array;
var currentInput = "";
var constantEntered = false;

function addToBuffer(keyPress) {
	if (constantEntered == true) {
		currentInput = "";
	}
	if (currentInput == "0" && keyPress.innerHTML == 0) { }
	else {
		currentInput += keyPress.innerHTML;
		display.innerHTML = currentInput;
	}
	constantEntered = false;
}

function addToBufferfromKey(keyInput) {
	currentInput += keyInput;
	display.innerHTML = currentInput;
}

function addToStack() {
	if (currentInput != "" && currentInput != NaN) {
		inputBuffer.push(currentInput);
		displayStack();
	}
	currentInput = "";
	display.innerHTML = "";
	constantEntered = false;
}

function clearInput() {
	currentInput = "";
	display.innerHTML = currentInput;
	constantEntered = false;
}

function clearAll() {
	currentInput = "";
	inputBuffer = [];
	display.innerHTML = currentInput;
	stackDisplay.innerHTML = inputBuffer;
	constantEntered = false;
}

function operator(action) {
	if (currentInput != "") {
		inputBuffer.push(currentInput);
		currentInput = "";
	}
	if (inputBuffer.length > 1) {
		number1 = parseFloat(inputBuffer.pop());
		number2 = parseFloat(inputBuffer.pop());
		if (action == "add") { 
			inputBuffer.push(number2 + number1);
		}
		else if (action == "subtract") {
			inputBuffer.push(number2 - number1);
		}
		else if (action == "multiply") {
			inputBuffer.push(number2 * number1);
		}
		else if (action == "divide") {
			inputBuffer.push(number2 / number1);
		}
		else if (action == "power") {
			inputBuffer.push(Math.pow(number2, number1));
		}
		else if (action == "root") {
			inputBuffer.push(Math.pow(number1, (1/number2)));
		}
		displayStack();
		display.innerHTML = currentInput;
		constantEntered = false;
	}
}

function singleItemOperator(action) {
	if (currentInput != "" ) {
		inputBuffer.push(currentInput);
		currentInput = "";
	}
	if (inputBuffer.length > 0) {
		number1 = parseFloat(inputBuffer.pop());
		if (action == "sqrt") {
			if (number1 >= 0) {
				inputBuffer.push(Math.sqrt(number1));
			}
			else{
				alert("square root function requires a positive value")
			}
		}
		else if (action == "ln") {
			inputBuffer.push(Math.log(number1));
		}
		else if (action == "log") {
			inputBuffer.push(Math.log(number1) / Math.LN10);
		}
		else if (action == "sin") {
			inputBuffer.push(Math.sin(number1));
		}
		else if (action == "cos") {
			inputBuffer.push(Math.cos(number1));
		}
		else if (action == "tan") {
			inputBuffer.push(Math.tan(number1));
		}
		else if (action == "reciprocal") {
			inputBuffer.push(1/number1);
		}
		else if (action == "square") {
			inputBuffer.push(number1 * number1);
		}
		else if (action == "cube") {
			inputBuffer.push(Math.pow(number1, 3));
		}
		else if (action == "factorial") {
			function factorial(numberInput) {
				if (numberInput === 0) { 
					return 1; 
				}
				else if (typeof numberInput === 'number' && numberInput % 1 === 0 && numberInput > 0) {
					return( numberInput * factorial(numberInput - 1));
				}
			}
			inputBuffer.push(factorial(number1));
		}
		else if (action == "10exp") {
			inputBuffer.push(Math.pow(10, number1));
		}
		//stackDisplay.innerHTML = inputBuffer;
		displayStack();
		display.innerHTML = currentInput;
		constantEntered = false;
	}
}

function constant(constant) {
	if (constant == "e") {
		val = Math.E;
	}
	else if (constant == "pi") {
		val = Math.PI;
	}
	else if (constant == "random") {
		val = Math.random();
	}
	else if (constant == "goldenRatio") {
		val = parseFloat(987/610);
	}
	if (currentInput == "") {
		currentInput = val;
		display.innerHTML = currentInput;
	}
	else {	//if number is currently in the buffer, multiply constant by existing number
		currentInput = val * parseFloat(currentInput);
		display.innerHTML = currentInput;
	}
	constantEntered = true; //so constant will clear form input on next non-submitted keypress
}

function popFromBuffer() {
	if (inputBuffer.length > 0) {
		inputBuffer.pop();
	}
	//stackDisplay.innerHTML = inputBuffer;
	displayStack();
}

function swap() {
	if (inputBuffer.length > 1) {
		number1 = inputBuffer.pop();
		number2 = inputBuffer.pop();
		inputBuffer.push(number1);
		inputBuffer.push(number2);
		//stackDisplay.innerHTML = inputBuffer;
		displayStack();
	}
}

function changePolarity() {
	if (currentInput != "") {
		currentInput = -1 * parseFloat(currentInput);
		display.innerHTML = currentInput;
	}
}

//Restrict display output to maximum 8 characters per array element
function displayStack() {
	stackDisplay.innerHTML = "";
	for (i = 0; i < inputBuffer.length; i++) {
		if (String(inputBuffer[i]).length > 8) {
			stackDisplay.innerHTML += inputBuffer[i].toPrecision(8);
		}
		else {
			stackDisplay.innerHTML += inputBuffer[i];
		}
		//unless last element, seperate list values with comma
		if (i < inputBuffer.length -1) {
			stackDisplay.innerHTML += ", ";
		}
	}
}

document.onkeydown = function(e) {
	constantEntered = false;
	e = e || window.event;
    switch (e.keyCode) {
    	case 13:
    		addToStack();
    		break;
        case 48:
        	addToBufferfromKey(0);
        	break;
        case 49:
        	addToBufferfromKey(1);
        	break;
        case 50:
        	addToBufferfromKey(2);
        	break;
        case 51:
        	addToBufferfromKey(3);
        	break;
        case 52:
        	addToBufferfromKey(4);
        	break;
        case 53:
        	addToBufferfromKey(5);
        	break;
        case 54:
        	addToBufferfromKey(6);
        	break;
        case 55:
        	addToBufferfromKey(7);
        	break;
        case 56:
        	addToBufferfromKey(8);
        	break;
        case 57:
        	addToBufferfromKey(9);
        	break;
        case 69:
        	constant('e');
        	break;
        case 88:
        	operator("multiply");
        	break;
        case 173:
        	operator("subtract");
        	break;
        case 191:
        	operator("divide");
        	break;
    }
};
