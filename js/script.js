/* script.js */

let equation = {
    operand1: null,
    operand2: null,
    operator: null
};

const contentContainer = document.querySelector("#content");
const calcContainer = document.querySelector("#calc-container");
const aquaImage = document.querySelector(".fading-image");
const calculator = document.createElement("div");
const view = document.createElement("div");
const topBtnContainer = document.createElement("div");
const bottomBtnContainer = document.createElement("div");
const lBottomBtnContainer = document.createElement("div");
const rBottomBtnContainer = document.createElement("div");
const numpad = document.createElement("div");

const rBound = window.innerWidth + 200;
const lBound = -200;

const maxPop = 20;

let swimCycle;
let fadeCycle;

const calcImages = ["./images/calc/calculator.png",
                    "./images/calc/button1.png",
                    "./images/calc/button2.png",
                    "./images/calc/button3.png",
                    "./images/calc/button4.png"];

const seaLifeImages = ["./images/todd-cravens-whale.jpg",
                        "./images/tim-de-pauw-hippo.jpg",
                        "./images/john-doe-pirate.jpg",
                        "./images/kind-and-curious-bubbles.jpg",
                        "./images/louan-garcia-dolphin.jpg",
                        "./images/michael-bernander-scuba-lionfish.jpg",
                        "./images/rostyslav-savchyn-ducky.jpg",
                        "./images/sebastian-pena-lambarri-clownfish.jpg",
                        "./images/maren-pauly-crocodile.jpg",
                        "./images/alvin-matthews-crabs.jpg"];

const creatureImages = ["./images/sea-life/whale.png",
                        "./images/sea-life/hippo.png",
                        "./images/sea-life/pirate.png",
                        "./images/sea-life/treasure.png",
                        "./images/sea-life/dolphin.png",
                        "./images/sea-life/scuba.png",
                        "./images/sea-life/duckie.png",
                        "./images/sea-life/clownfish.png",
                        "./images/sea-life/crocodile.png",
                        "./images/sea-life/crab.png"];

const seaLifeSounds = ["./sounds/whale.mp3",
                        "./sounds/hippo.mp3",
                        "./sounds/pirate.mp3",
                        "./sounds/bubbles.mp3",
                        "./sounds/dolphin.mp3",
                        "./sounds/camera.mp3",
                        "./sounds/duck.mp3",
                        "./sounds/clown.mp3",
                        "./sounds/hiss.mp3",
                        "./sounds/snipping.mp3"];

const impactSound = "./sounds/impact-boom.mp3";

let allSeaLife = [];

class SeaLife {

    constructor(image, y) {

        this.image = document.createElement("img");
        this.image.classList.add("moving-object");
        this.image.src = image;

        this.yPos = y;
        this.image.style.top = this.yPos;

        this.speed = 0.34 + (Math.random() * 0.66);

        this.facingRight = (Math.floor(Math.random() * 2) == 0);

        this.image.style.left = "0px";

        let size = 50 + Math.floor(Math.random() * 200);

        this.image.style.width = size + "px";
        this.image.style.height = size + "px";

        if(!this.facingRight) {

            this.speed *= -1;
            this.image.style.left = rBound + "px";
        }

        // Push to list, and add to content
        allSeaLife.push(this);
        contentContainer.appendChild(this.image);
    }

    swim() {
        
        //this.image.style.top = this.yPos;

        let pos = this.image.getBoundingClientRect();

        if(this.facingRight) {

            if(pos.left > rBound) {

                this.image.style.left = lBound + "px";
                pos = this.image.getBoundingClientRect();
            }

            this.image.style.left = pos.left + this.speed + "px";
        }
        else {

            if(pos.left < lBound) {

                this.image.style.left = rBound + "px";
                pos = this.image.getBoundingClientRect();
            }

            this.image.style.left = pos.left + this.speed + "px";
        }
    }
}


createCalculator();

function createCalculator() {

    createCalcBackground();
    organizeCalculator();
    createNumpad();
    createTopButtons();
    createRightButtons();
    updateView();
    loadImages(); // Preload images

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

function loadImages() {

    for(let i = 0; i < seaLifeImages.length; i++) {

        aquaImage.style.src = seaLifeImages[i];
    }
}

function createCalcBackground() {

    const img = document.createElement("img");
    img.classList.add("calc-image");
    img.src = calcImages[0];

    calcContainer.appendChild(img);
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

        const img = document.createElement("img");
        img.classList.add("button-image");

        const txt = document.createElement("div");
        txt.classList.add("button-text");

        if(i != 0) {

            img.src = calcImages[1];
        }
        else {

            img.src = calcImages[4];
        }

        if(i > -1) {

            txt.textContent = i;

            num.addEventListener("click", () => {
    
                addNumber(i);
            });

            if(i == 0) { // 0 is wider
                num.classList.add("zero-button");
            }
        }
        else { // At -1, add decimal

            txt.textContent = ".";

            num.addEventListener("click", () => {
    
                addDecimalPlace();
            });
        }


        num.appendChild(img);
        num.appendChild(txt);

        numpad.appendChild(num);
    }
}

function createTopButtons() {

    // Create array for easier image addition later
    let allButtons = [];

    const backButton = document.createElement("div");
    const clearButton = document.createElement("div");
    const moduloButton = document.createElement("div");
    const divideButton = document.createElement("div");

    allButtons.push(backButton);
    allButtons.push(clearButton);
    allButtons.push(moduloButton);
    allButtons.push(divideButton);

    backButton.classList.add("button");
    clearButton.classList.add("button");
    moduloButton.classList.add("button");
    divideButton.classList.add("button");

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

    // Add image/text
    for(let i = 0; i < allButtons.length; i++) {

        const img = document.createElement("img");
        img.classList.add("button-image");
        img.src = calcImages[2];

        const txt = document.createElement("div");
        txt.classList.add("button-text");

        switch(i) {
            case 0:
                txt.textContent = "<-";
                break;
            case 1:
                txt.textContent = "AC";
                break;
            case 2:
                txt.textContent = "%";
                break;
            case 3:
                txt.textContent = "/";
                break;
        }

        allButtons[i].appendChild(img);
        allButtons[i].appendChild(txt);
    }

    topBtnContainer.appendChild(backButton);  
    topBtnContainer.appendChild(clearButton);  
    topBtnContainer.appendChild(moduloButton);  
    topBtnContainer.appendChild(divideButton);  
}

function createRightButtons() {

    let allButtons = [];

    const multiplyButton = document.createElement("div");
    const subtractButton = document.createElement("div");
    const addButton = document.createElement("div");
    const equalsButton = document.createElement("div");

    multiplyButton.classList.add("button");
    subtractButton.classList.add("button");
    addButton.classList.add("button");
    equalsButton.classList.add("button");

    allButtons.push(multiplyButton);
    allButtons.push(subtractButton);
    allButtons.push(addButton);
    allButtons.push(equalsButton);

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

    // Add image/text
    for(let i = 0; i < allButtons.length; i++) {

        const img = document.createElement("img");
        img.classList.add("button-image");
        img.src = calcImages[2];

        const txt = document.createElement("div");
        txt.classList.add("button-text");

        switch(i) {
            case 0:
                txt.textContent = "*";
                break;
            case 1:
                txt.textContent = "-";
                break;
            case 2:
                txt.textContent = "+";
                break;
            case 3:
                img.src = calcImages[3];
                txt.textContent = "=";
                break;
        }

        allButtons[i].appendChild(img);
        allButtons[i].appendChild(txt);
    }

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

    // Kill fish and end swimCycle if running
    if(swimCycle != null) {

        // Clear swimCycle before deleting
        clearInterval(swimCycle);

        for(let i = 0; i < allSeaLife.length; i++) {

            allSeaLife[i].image.remove();
            
            delete allSeaLife[i];
        }

        // Make new array
        allSeaLife = [];

        swimCycle = null;
    }
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
    aquaImage.style.opacity = -1;
    
    // Play sound
    let audio = new Audio(seaLifeSounds[num]);
    audio.play();

    let impactAudio = new Audio(impactSound);
    impactAudio.play();

    // Clear image-fading interval and reset
    if(fadeCycle != null) {
        
        clearInterval(fadeCycle);
    }
    
    fadeCycle = setInterval(fadeImage, 10);

    // Spawn swimming sea life
    spawnSeaLife(creatureImages[num], num);
}

function fadeImage() {
    
    if(aquaImage.style.opacity < 0) {

        aquaImage.style.opacity = 1;
    }
    
    if(aquaImage.style.opacity > 0.01) {

        aquaImage.style.opacity -= 0.01;
    }
    else { // End cycle once cleared

        aquaImage.style.opacity = -1;
        clearInterval(fadeCycle);
    }
}

function spawnSeaLife(img, num) {

    // Begin swim interval, if no life exists yet
    if(swimCycle == null) {

        swimCycle = setInterval(moveSeaLife, 10);
    }

    let y = Math.floor(5 + (Math.random() * 80));
    y = y.toString() + "vh";

    // Spawn new sea life up to maximum pop
    if(allSeaLife.length < maxPop) {

        let newLife = new SeaLife(img, y);
    }
}

function moveSeaLife() {

    for(let i = 0; i < allSeaLife.length; i++) {

        allSeaLife[i].swim();
    }
}