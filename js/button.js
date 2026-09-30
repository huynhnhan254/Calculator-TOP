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

for (let i = 0; i <= 9; i++) {
    const number = document.createElement("button");
    number.textContent = i;
    numberDiv.appendChild(number);
}

// OPERATOR
const operatorArr = ['+', '-', '*', '/', '='];
const operatorDiv = document.createElement("div");
operatorDiv.classList.add("operatorBtn");
button.appendChild(operatorDiv);

for (let i = 0; i < operatorArr.length - 1; i++) {
    const operator = document.createElement("button");
    operator.textContent = operatorArr[i];
    operatorDiv.appendChild(operator);
}

// CLEAR
const clearBtn = document.createElement("div");
clearBtn.classList.add("clearBtn");
button.appendChild(clearBtn);
const clear = document.createElement("button");
clear.textContent = "CE";
clearBtn.appendChild(clear);