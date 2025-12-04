class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    if (this.currentOperand.length === 1) {
      this.currentOperand = "0";
    } else {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    this.updateDisplay();
  }

  appendNumber(number) {
    // evitar más de un punto decimal
    if (number === "." && this.currentOperand.includes(".")) return;

    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    // si ya había operación, calcula antes (soporta 2+3*4 encadenado)
    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "÷":
        if (current === 0) {
          result = "Error";
        } else {
          result = prev / current;
        }
        break;
      default:
        return;
    }

    this.currentOperand = result.toString();
    this.operation = undefined;
    this.previousOperand = "";
    this.updateDisplay();
  }

  updateDisplay() {
    this.currentTextElement.textContent = this.currentOperand;

    if (this.operation != null && this.previousOperand !== "") {
      this.previousTextElement.textContent = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousTextElement.textContent = "";
    }
  }
}

// --- wiring con el DOM --- //
const prevTextElement = document.getElementById("prev");
const currentTextElement = document.getElementById("curr");

const calculator = new Calculator(prevTextElement, currentTextElement);

document.querySelectorAll("[data-number]").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.getAttribute("data-number"));
  });
});

document.querySelectorAll("[data-operation]").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.getAttribute("data-operation"));
  });
});

document.querySelector("[data-equals]").addEventListener("click", () => {
  calculator.compute();
});

document.querySelector("[data-all-clear]").addEventListener("click", () => {
  calculator.clear();
});

document.querySelector("[data-delete]").addEventListener("click", () => {
  calculator.delete();
});
