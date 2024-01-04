/* script.js */

let equation = {
    operand1: null,
    operand2: null,
    operator: null
};

const calcContainer = document.querySelector("#calc-container");
const aquaImage = document.querySelector(".fading-image");
const calculator = document.createElement("div");
const view = document.createElement("div");
const topBtnContainer = document.createElement("div");
const bottomBtnContainer = document.createElement("div");
const lBottomBtnContainer = document.createElement("div");
const rBottomBtnContainer = document.createElement("div");
const numpad = document.createElement("div");

let seaLifeCycle;

const seaLifeImages = ["./images/todd-cravens-whale.jpg",
                        "./images/tim-de-pauw-hippo.jpg",
                        "./images/john-doe-pirate.jpg",
                        "./images/kind-and-curious-bubbles.jpg",
                        "./images/louan-garcia-dolphin.jpg",
                        "./images/michael-bernander-scuba-lionfish.jpg",
                        "./images/rostyslav-savchyn-ducky.jpg",
                        "./images/sebastian-pena-lambarri-clownfish.jpg",
                        "./images/tengyart-beluga.jpg",
                        "./images/alvin-matthews-crabs.jpg"];

const seaLifeSounds = ["./sounds/whale.mp3",
                        "./sounds/hippo.mp3",
                        "./sounds/pirate.mp3",
                        "./sounds/bubbles.mp3",
                        "./sounds/dolphin.mp3",
                        "./sounds/duck.mp3",
                        "./sounds/duck.mp3",
                        "./sounds/clown.mp3",
                        "./sounds/duck.mp3",
                        "./sounds/duck.mp3"];

const impactSound = "./sounds/impact-boom.mp3";
                        

createCalculator();

function createCalculator() {

    organizeCalculator();
    createNumpad();
    createTopButtons();
    createRightButtons();
    updateView();

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
        else if(event.key === "Enter"
                || event.key === "=") {

            solve();
        }
        else if(event.key === "Backspace"
            || event.key === "Delete") {

            backspace();
        }
    });
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

    if(equation.operator == null) {

        if(equation.operand1 == null) {

            equation.operand1 = "0.";
        }
        else if(!equation.operand1.includes(".")) {

            equation.operand1 += ".";
        }
    }
    else {

        if(equation.operand2 == null) {

            equation.operand2 = "0.";
        }
        else if(!equation.operand2.includes(".")) {

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

    // Divide by 0; kill fish
    if(equation.operand2 == "0" &&
        equation.operator == "/") {

        killFish();
        return;
    }

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

    /* round to six decimals, if longer */
    answer = answer.toString();

    if(answer.includes(".")
        && answer.substring(answer.indexOf(".")).length > 7) {
            answer = answer.substring(0, answer.indexOf(".") + 7);
    }
    
    equation.operand1 = answer;
    
    updateView();

    /* Create sea life based on last digit */
    let lastChar = answer.substring(answer.length - 1);
    createSeaLife(Number.parseInt(lastChar));
}

function killFish() {

    resetEquation();

    view.textContent = ":(";
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
    else if(str.length > 18) { // If too long, just display the ends

        str = str.substring(str.length - 18, str.length);
    }

    view.textContent = str;
}

function createSeaLife(num) {

    // Set new image source, and set opacity
    aquaImage.src = seaLifeImages[num];
    aquaImage.style.opacity == 0;
    
    // Play sound
    let audio = new Audio(seaLifeSounds[num]);
    audio.play();

    let impactAudio = new Audio(impactSound);
    impactAudio.play();

    // Clear image-fading interval and reset
    clearInterval(seaLifeCycle);
    
    seaLifeCycle = setInterval(function() {

        if(aquaImage.style.opacity == 0) {

            aquaImage.src = seaLifeImages[num];
            aquaImage.style.opacity = 1;
        }

        if(aquaImage.style.opacity > 0.01) {

            aquaImage.style.opacity -= 0.01;
        }
    }, 10);

    aquaImage.style.opacity = 0;
}