/* script.js */

let equation = {
    operand1: null,
    operand2: null,
    operator: null
};

const calcContainer = document.querySelector("#calc-container");
const calculator = document.createElement("div");
const view = document.createElement("div");
const topBtnContainer = document.createElement("div");
const bottomBtnContainer = document.createElement("div");
const lBottomBtnContainer = document.createElement("div");
const rBottomBtnContainer = document.createElement("div");
const numpad = document.createElement("div");

createCalculator();

function createCalculator() {

    organizeCalculator();
    createNumpad();
    createTopButtons();
    createRightButtons();
    updateView();
}

function organizeCalculator() {

    calcContainer.appendChild(view);
    calcContainer.appendChild(topBtnContainer);
    calcContainer.appendChild(bottomBtnContainer);
    bottomBtnContainer.appendChild(lBottomBtnContainer);
    bottomBtnContainer.appendChild(rBottomBtnContainer);

    view.setAttribute("id", "view");
    topBtnContainer.setAttribute("id", "top-btn-container");
    bottomBtnContainer.setAttribute("id", "bottom-btn-container");
    lBottomBtnContainer.classList.add("left-bottom-btns");
    rBottomBtnContainer.classList.add("right-bottom-btns");
}

function createNumpad() {

    lBottomBtnContainer.appendChild(numpad);
    numpad.setAttribute("id", "numpad-container");

    for(let i = 9; i > -2; i--) {

        const num = document.createElement("div");
        num.classList.add("button");

        if(i > -1) {

            num.textContent = i;

            num.addEventListener("click", () => {
    
                addNumber(i);
            });

            if(i == 0) { // 0 is wider
                num.classList.add("zero-button");
            }
        }
        else { // At -1, add decimal

            num.textContent = ".";

            num.addEventListener("click", () => {
    
                addDecimalPlace();
            });
        }

        numpad.appendChild(num);
    }
}

function createTopButtons() {

    const backButton = document.createElement("div");
    const clearButton = document.createElement("div");
    const moduloButton = document.createElement("div");
    const divideButton = document.createElement("div");

    backButton.classList.add("button");
    clearButton.classList.add("button");
    moduloButton.classList.add("button");
    divideButton.classList.add("button");

    backButton.textContent = "<-";
    clearButton.textContent = "AC";
    moduloButton.textContent = "%";
    divideButton.textContent = "/";

    backButton.addEventListener("click", () => {

        backspace();
    });

    clearButton.addEventListener("click", () => {

        resetEquation();
    });

    moduloButton.addEventListener("click", () => {

        setOperator("%");
    });

    divideButton.addEventListener("click", () => {

        setOperator("/");
    });

    topBtnContainer.appendChild(backButton);  
    topBtnContainer.appendChild(clearButton);  
    topBtnContainer.appendChild(moduloButton);  
    topBtnContainer.appendChild(divideButton);  
}

function createRightButtons() {

    const multiplyButton = document.createElement("div");
    const subtractButton = document.createElement("div");
    const addButton = document.createElement("div");
    const equalsButton = document.createElement("div");

    multiplyButton.classList.add("button");
    subtractButton.classList.add("button");
    addButton.classList.add("button");
    equalsButton.classList.add("button");

    multiplyButton.textContent = "*";
    subtractButton.textContent = "-";
    addButton.textContent = "+";
    equalsButton.textContent = "=";

    multiplyButton.addEventListener("click", () => {

        setOperator("*");
    });
    
    subtractButton.addEventListener("click", () => {

        setOperator("-");
    });

    addButton.addEventListener("click", () => {

        setOperator("+");
    });

    equalsButton.addEventListener("click", () => {

        solve();
    });

    rBottomBtnContainer.appendChild(multiplyButton);
    rBottomBtnContainer.appendChild(subtractButton);
    rBottomBtnContainer.appendChild(addButton);
    rBottomBtnContainer.appendChild(equalsButton);
}

function addNumber(num) {

    // No more than 16 characters on the board
    // Prevent more than 10 chars for operand1
    if(equation.operand2 == null
        && equation.operator == null
        && view.textContent.length > 10) {

        return;
    }
    else if(view.textContent.length > 16) {

        return;
    } 

    // With no operator present, add to operand1
    // Otherwise, add to operand2
    if(equation.operator == null) {

        if(equation.operand1 == null) {

            equation.operand1 = num.toString();
        }
        else {

            equation.operand1 = equation.operand1 + num.toString();
        }
    }
    else {

        if(equation.operand2 == null) {

            equation.operand2 = num.toString();
        }
        else {

            equation.operand2 = equation.operand2 + num.toString();
        }
    }

    updateView();
}

function addDecimalPlace() {

    if(equation.operand2 == null) {

        if(!equation.operand1.includes(".")) {

            equation.operand1 += ".";
        }
    }
    else {

        if(!equation.operand2.includes(".")) {
            
            equation.operand2 += ".";
        } 
    }

    updateView();
}

function setOperator(op) {

    // If no operand, return
    if(equation.operand1 == null) {

        return;
    }

    // If an equation already exists on the
    // board, solve before adding the operator
    if(equation.operand1 != null &&
        equation.operand2 != null) {

        solve();
    }

    equation.operator = op;

    updateView();
}

function solve() {

    // Unable to solve without both operands
    if(equation.operand1 == null || 
        equation.operand2 == null ||
        equation.operator == null) {

        return;
    }

    // Turn strings to floats
    equation.operand1 = parseFloat(equation.operand1);
    equation.operand2 = parseFloat(equation.operand2);

    let answer = equation.operand1;

    switch(equation.operator) {

        case "+":

            answer += equation.operand2;
            break;

        case "-":

            answer -= equation.operand2;
            break;

        case "/":

            answer /= equation.operand2;
            break; 

        case "*":

            answer *= equation.operand2;
            break;

        case "%":
            answer %= equation.operand2;
            break;
    }

    resetEquation();
    equation.operand1 = answer.toString();

    updateView();
}

function backspace() {

    if(equation.operand2 != null) {

        if(equation.operand2.length < 2) {

            equation.operand2 = null;
        }
        else {

            equation.operand2 = equation.operand2.slice(0, -1);
        }
    }
    else if(equation.operator != null) {

        equation.operator = null;
    }
    else if(equation.operand1 != null) {

        if(equation.operand1.length < 2) {

            resetEquation();
        }
        else {

            equation.operand1 = equation.operand1.slice(0, -1);
        }
    }

    updateView();
}

function resetEquation() {

    equation.operand1 = null;
    equation.operand2 = null;
    equation.operator = null;

    updateView();
}

function updateView() {

    let str = "";

    if(equation.operand1 != null) {

        str += equation.operand1 + " ";

        if(equation.operator != null) {

            str += equation.operator + " ";

            if(equation.operand2 != null) {

                str += equation.operand2;
            }
        }
    }

    if(str.length < 1) {

        str = "-";
    }

    view.textContent = str;
}

// Keyboard support
document.addEventListener("keydown", (event) => {

    // Integer; add to calc
    if(isFinite(event.key)) {

        addNumber(event.key);
    }
    else if(event.key === ".") {

        addDecimalPlace();
    }
    else if(event.key === "+"
        || event.key === "-"
        || event.key === "*"
        || event.key === "/"
        || event.key === "%") {

        setOperator(event.key);
    }
    else if(event.key === "Enter") {

        solve();
    }
    else if(event.key === "Backspace"
        || event.key === "Delete") {

        backspace();
    }
});