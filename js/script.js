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

    topBtnContainer.textContent = "hey";
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


}

function createRightButtons() {

    const multiplyButton = document.createElement("div");
    const subtractButton = document.createElement("div");
    const addButton = document.createElement("div");
    const equalsButton = document.createElement("div");

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

    // With no operator present, add to operand1
    // Otherwise, add to operand2
    if(equation.operator == null) {

        equation.operand1 = num;
    }
    else {

        equation.operand2 = num;
    }

    updateView();
}

function addDecimalPlace() {

}

function setOperator(op) {

    equation.operator = op;

    updateView();
}

function solve() {

    // Unable to solve without both operands
    if(operand1 == null
        || operand2 == null) {

        return;
    }

    let answer = equation.operand1;

    switch(equation.operation) {

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
    equation.operand1 = answer;

    updateView();
}

function resetEquation() {

    equation.operand1 = null;
    equation.operand2 = null;
    equation.operator = null;
}

function updateView() {

    /*
    if(equation.operand2 != null) {

        view.textContent = equation.operand2;
    }
    else if(equation.operand1 != null) {

        view.textContent = equation.operand1;
    }
    else {

        view.textContent = "-";
    }
    */

    let str = "";

    if(equation.operand1 != null) {

        str += equation.operand1 + " ";
    }

    if(equation.operator != null) {

        str += equation.operator + " ";
    }
    
    if(equation.operand2 != null) {

        str += equation.operand2;
    }

    if(str.length < 1) {
        str = "-";
    }

    view.textContent = str;
}