const container = document.querySelector("#container");

const screen = document.createElement("div");
screen.classList.add("screen");
screen.textContent = "0";
container.appendChild(screen);

const button = document.createElement("div");
button.classList.add("button");
container.appendChild(button);

// NUMBER
const numberDiv = document.createElement("div");
numberDiv.classList.add("numberBtn");
button.appendChild(numberDiv);

let numbA = "";
let numbB = "";
let op = "";
let lastB = "";
let lastOp = "";

const numberButtons = [];
const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

for (let i = 0; i <= 9; i++) {
    const number = document.createElement("button");
    number.textContent = numbers[i];
    numberDiv.appendChild(number);

    numberButtons[numbers[i]] = number;

    number.addEventListener("click", ()=>{
        if (op === "") {
            numbA += number.textContent;
            screen.textContent = numbA;
        } else {
            numbB += number.textContent;
            screen.textContent = numbA + op + numbB;
        }
    });

}

// DECIMAL
const decimal = document.createElement("button");
decimal.textContent = ".";
numberDiv.appendChild(decimal);

decimal.addEventListener("click", () => {
    if (op === "") {
        if (!numbA.includes(".")) {
            numbA += ".";
            screen.textContent = numbA;
        }
    } else {
        if (!numbB.includes(".")) {
            numbB += ".";
            screen.textContent = numbA + op + numbB;
        }
    }
});

// OPERATOR
const operatorArr = ['+', '-', '*', '/'];
const operatorDiv = document.createElement("div");
const operatorButtons = {};

operatorDiv.classList.add("operatorBtn");
button.appendChild(operatorDiv);

for (let i = 0; i < operatorArr.length; i++) {
    const operator = document.createElement("button");
    operator.textContent = operatorArr[i];
    operatorDiv.appendChild(operator);

    operatorButtons[operatorArr[i]] = operator;

    operator.addEventListener("click", ()=>{
        const newOp = operator.textContent;

        if (newOp === "=") {
            if (numbA !== "" && numbB != "" && op !== "") {
                lastB = numbB;
                lastOp = op;

                numbA = operate(Number(numbA), Number(numbB), op);
                numbB = "";
                op = "";
                screen.textContent = numbA;
            } else if (numbA !== "" && op === "" && lastB !="" && lastOp !== "") {
                numbA = operate(Number(numbA), Number(lastB), lastOp);
                screen.textContent = numbA;
            }
        } else {
            if (numbA !== "" && numbB !== "" && op !== "") {
                numbA = operate(Number(numbA), Number(numbB), op);
                numbB = "";
            }

            op = newOp;
            screen.textContent = numbA + op;
        }
    });
}

// EQUAL
const equals = document.createElement("button");
equals.textContent = "=";
numberDiv.appendChild(equals);

operatorButtons["="] = equals;

equals.addEventListener("click", () => {
    if (numbA !== "" && numbB !== "" && op !== "") {
        lastB = numbB;
        lastOp = op;

        numbA = operate(Number(numbA), Number(numbB), op);
        numbB = "";
        op = "";
        screen.textContent = numbA;
    } else if (numbA !== "" && op === "" && lastB !== "" && lastOp !== "") {
        numbA = operate(Number(numbA), Number(lastB), lastOp);
        screen.textContent = numbA;
    }
});

// CLEAR
const clearBtn = document.createElement("div");
clearBtn.classList.add("clearBtn");
button.appendChild(clearBtn);
const clear = document.createElement("button");
clear.textContent = "CE";
clearBtn.appendChild(clear);
clear.addEventListener("click", ()=>{
    numbA = "";
    numbB = "";
    op = "";
    screen.textContent = 0;
});


// BACKSPACE 
const backspace = document.createElement("button");
backspace.textContent = "⌫";
clearBtn.appendChild(backspace);

backspace.addEventListener("click", () => {
    if (op === "") {
        numbA = numbA.slice(0, -1);
        screen.textContent = numbA || "0";
    } else {
        if (numbB === "") {
            op = "";
            screen.textContent = numbA;
        } else {
            numbB = numbB.slice(0, -1);
            screen.textContent = numbA + op + numbB;
        }
    }
});

// Keyboard handling
document.addEventListener("keydown", (event) => {
    if (event.key >= "0" && event.key <= "9") {
        numberButtons[Number(event.key)].click();
    } else if (operatorArr.includes(event.key)) {
        operatorButtons[event.key].click();
    } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        equals.click();
    } else if (event.key === ".") {
        decimal.click();
    } else if (event.key === "Backspace") {
        backspace.click();
    }
});