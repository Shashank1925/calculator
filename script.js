// Kindly do not modify the prewritten code.
// Your task is to implement the functions below to make the calculator work.

let display = document.getElementById("display");
let currentInput = "0";
let buttons = document.querySelectorAll("button");
let opert = null;
let priviousInput = "";

function clearDisplay() {
  // TODO: Implement the clearDisplay function
  // This function should reset the currentInput and update the display
  currentInput = "0";
  priviousInput = "";
  display.innerText = 0;
}

function deleteLast() {
  // TODO: Implement the deleteLast function
  // This function should remove the last character from currentInput and update the display
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  display.innerText = currentInput;
}

function appendNumber(number) {
  // TODO: Implement the appendNumber function
  // This function should add the given number to currentInput and update the display
  if (currentInput === "0" && number !== ".") {
    currentInput = number;
  } else {
    currentInput += number;
  }
  // display.textContent = currentInput;
  if (priviousInput && opert) {
    display.innerText = `${priviousInput} ${opert} ${currentInput}`;
  } else {
    display.innerText = currentInput;
  }
}

function appendOperator(operator) {
  // TODO: Implement the appendOperator function
  // This function should add the given operator to currentInput and update the display

  if (currentInput === "0" && !priviousInput) return;
  if (opert) {
    calculateResult();
  }
  priviousInput = currentInput;
  opert = operator;
  currentInput = "";
  display.innerText = `${priviousInput} ${opert}`;
}

function calculateResult() {
  // TODO: Implement the calculateResult function
  // This function should evaluate the currentInput, display the result, and handle errors
  if (!currentInput || !opert || !priviousInput) return;
  const num1 = parseFloat(priviousInput);
  const num2 = parseFloat(currentInput);
  let result;
  switch (opert) {
    case "+":
      result = (num1 + num2).toString();
      break;
    case "-":
      result = (num1 - num2).toString();
      break;
    case "*":
      result = (num1 * num2).toString();
      break;
    case "/":
      result = num2 === 0 ? "infinite" : (num1 / num2).toString();
      break;
    default:
      return;
  }
  currentInput = result.toString();
  priviousInput = "";
  opert = null;
  display.innerText = currentInput;
}
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("gray")) {
      if (button.innerText == "AC") {
        clearDisplay();
      } else if (button.innerText == "DEL") {
        deleteLast();
      } else if (button.innerText == "%") {
        // currentInput = (parseFloat(currentInput) * 0.01 + "%").toString();
        // display.innerText = currentInput;
        if (!opert) {
          currentInput = (parseFloat(currentInput) / 100).toString();
          display.innerText = currentInput;
        } else if (priviousInput && currentInput) {
          // If part of an expression, calculate percentage relative to previous input
          currentInput = (
            (parseFloat(priviousInput) * parseFloat(currentInput)) /
            100
          ).toString();
          display.innerText = `${priviousInput} ${opert} ${currentInput}`;
        }
      }
    } else if (button.classList.contains("orange")) {
      if (button.innerText === "=") {
        calculateResult();
      } else {
        appendOperator(button.innerText);
      }
    } else {
      appendNumber(button.innerText);
    }
  });
});
