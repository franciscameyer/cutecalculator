class Calculator {
  constructor(previousTextElement, currentTextElement, historyListElement, historyPanelElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.historyListElement = historyListElement;
    this.historyPanelElement = historyPanelElement;
    this.historyOpen = false;
    this.history = [];
    this.undoStack = [];
    this.isShiftActive = false;
    this.lastExpression = "";
    this.pendingFunction = null;
    this.pendingFunctionLabel = "";
    this.clear();
    this.renderHistory();
    this.updateHistoryVisibility();
  }

  clear() {
    if (this.currentOperand !== undefined) {
      this.saveState();
    }
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
    this.lastExpression = "";
    this.pendingFunction = null;
    this.pendingFunctionLabel = "";
    this.cursorIndex = this.currentOperand.length;
    this.updateDisplay();
  }

  appendNumber(number) {
    this.saveState();
    this.lastExpression = "";
    if (this.pendingFunction && (this.currentOperand === "0" || this.currentOperand === "")) {
      this.currentOperand = "";
      this.cursorIndex = 0;
    }
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = "";
      this.cursorIndex = 0;
    }
    this.insertAtCursor(number.toString());
  }

  appendParenthesis(symbol) {
    this.saveState();
    if (this.currentOperand === "0") {
      this.currentOperand = "";
      this.cursorIndex = 0;
    }
    this.insertAtCursor(symbol);
  }

  toggleSign() {
    this.saveState();
    if (this.currentOperand === "0") return;
    if (this.currentOperand.startsWith("-")) {
      this.currentOperand = this.currentOperand.slice(1);
      this.cursorIndex = Math.max(this.cursorIndex - 1, 0);
    } else {
      this.currentOperand = "-" + this.currentOperand;
      this.cursorIndex += 1;
    }
    this.updateDisplay();
  }

  applyFunction(funcName) {
    this.saveState();
    const isInitialOperand = this.isOperandInInitialState();
    if (isInitialOperand) {
      this.pendingFunction = funcName;
      this.pendingFunctionLabel = this.formatFunctionLabel(funcName);
      this.lastExpression = "";
      this.updateDisplay();
      return;
    }

    const value = this.parseOperand(this.currentOperand);
    if (isNaN(value)) return;
    const { result, expression } = this.evaluateUnaryFunction(funcName, value);
    this.addToHistory(expression, result);
    this.lastExpression = expression;
    this.currentOperand = result.toString();
    this.cursorIndex = this.currentOperand.length;
    this.previousOperand = "";
    this.operation = undefined;
    this.pendingFunction = null;
    this.pendingFunctionLabel = "";
    this.updateDisplay();
  }

  chooseOperation(operation) {
    this.saveState();
    if (this.pendingFunction) {
      const applied = this.applyPendingFunctionToCurrent();
      if (!applied) return;
    }
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.lastExpression = "";
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.cursorIndex = 0;
    this.updateDisplay();
  }

  compute() {
    this.saveState();
    if (this.pendingFunction) {
      const applied = this.applyPendingFunctionToCurrent();
      if (!applied) return;
    }
    if (!this.operation) {
      this.previousOperand = "";
      this.updateDisplay();
      return;
    }
    const prev = this.parseOperand(this.previousOperand);
    this.lastExpression = "";
    const current = this.parseOperand(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    let result;

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
      case "/":
        result = current === 0 ? "Error" : prev / current;
        break;
      case "^":
        result = Math.pow(prev, current);
        break;
      case "root":
        if (prev === 0 || (current < 0 && prev % 2 === 0)) {
          result = "Error";
        } else {
          result = Math.pow(current, 1 / prev);
        }
        break;
      default:
        return;
    }

    const expression = `${this.previousOperand} ${this.operation} ${this.currentOperand}`;
    this.addToHistory(expression, result);
    this.currentOperand = result.toString();
    this.cursorIndex = this.currentOperand.length;
    this.operation = undefined;
    this.previousOperand = "";
    this.updateDisplay();
  }

  moveCursor(direction) {
    if (direction === "left") {
      this.cursorIndex = Math.max(0, this.cursorIndex - 1);
    } else if (direction === "right") {
      this.cursorIndex = Math.min(this.currentOperand.length, this.cursorIndex + 1);
    }
    this.updateDisplay();
  }

  addToHistory(expression, result) {
    this.history.unshift({ expression, result });
    if (this.history.length > 12) {
      this.history.pop();
    }
    this.renderHistory();
  }

  clearHistory() {
    this.history = [];
    this.renderHistory();
  }

  renderHistory() {
    this.historyListElement.innerHTML = "";
    if (this.history.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.className = "history-empty";
      emptyItem.textContent = "Sin operaciones aun";
      this.historyListElement.appendChild(emptyItem);
      return;
    }

    this.history.forEach(({ expression, result }) => {
      const li = document.createElement("li");
      li.className = "history-item";
      li.innerHTML = `<strong>${expression} = ${result}</strong>`;
      this.historyListElement.appendChild(li);
    });
  }

  updateDisplay() {
    const text = this.currentOperand || "";
    const idx = Math.min(Math.max(this.cursorIndex, 0), text.length);
    const before = this.escapeHTML(text.slice(0, idx));
    const after = this.escapeHTML(text.slice(idx));
    this.currentTextElement.innerHTML = `${before}<span class="cursor"></span>${after || "&nbsp;"}`;

    if (this.operation != null && this.previousOperand !== "") {
      this.previousTextElement.textContent = `${this.previousOperand} ${this.operation}`;
    } else if (this.pendingFunctionLabel && !this.lastExpression) {
      this.previousTextElement.textContent = this.pendingFunctionLabel;
    } else if (this.lastExpression) {
      this.previousTextElement.textContent = this.lastExpression;
    } else {
      this.previousTextElement.textContent = "";
    }
  }

  toggleHistoryPanel() {
    this.historyOpen = !this.historyOpen;
    this.updateHistoryVisibility();
  }

  updateHistoryVisibility() {
    const isHidden = !this.historyOpen;
    this.historyPanelElement.setAttribute("aria-hidden", isHidden ? "true" : "false");
  }

  parseOperand(raw) {
    if (typeof raw !== "string") return parseFloat(raw);
    const cleaned = raw.replace(/[()]/g, "");
    return parseFloat(cleaned);
  }

  isOperandInInitialState() {
    return this.currentOperand === "0" || this.currentOperand === "";
  }

  factorial(n) {
    let res = 1;
    for (let i = 2; i <= n; i += 1) {
      res *= i;
      if (!isFinite(res)) return "Error";
    }
    return res;
  }

  toRadians(deg) {
    return (deg * Math.PI) / 180;
  }

  toDegrees(rad) {
    return (rad * 180) / Math.PI;
  }

  formatFunctionLabel(funcName) {
    switch (funcName) {
      case "sin":
      case "cos":
      case "tan":
      case "asin":
      case "acos":
      case "atan":
      case "log":
      case "ln":
      case "sqrt":
      case "square":
      case "fact":
        return `${funcName}(`;
      case "exp10":
        return "10^(";
      case "exp":
        return "e^(";
      default:
        return `${funcName}(`;
    }
  }

  evaluateUnaryFunction(funcName, value) {
    switch (funcName) {
      case "sin":
        return { result: Math.sin(this.toRadians(value)), expression: `sin(${value})` };
      case "cos":
        return { result: Math.cos(this.toRadians(value)), expression: `cos(${value})` };
      case "tan":
        return { result: Math.tan(this.toRadians(value)), expression: `tan(${value})` };
      case "asin":
        return {
          result: value < -1 || value > 1 ? "Error" : this.toDegrees(Math.asin(value)),
          expression: `asin(${value})`,
        };
      case "acos":
        return {
          result: value < -1 || value > 1 ? "Error" : this.toDegrees(Math.acos(value)),
          expression: `acos(${value})`,
        };
      case "atan":
        return { result: this.toDegrees(Math.atan(value)), expression: `atan(${value})` };
      case "log":
        return { result: value <= 0 ? "Error" : Math.log10(value), expression: `log(${value})` };
      case "ln":
        return { result: value <= 0 ? "Error" : Math.log(value), expression: `ln(${value})` };
      case "exp10":
        return { result: Math.pow(10, value), expression: `10^(${value})` };
      case "exp":
        return { result: Math.exp(value), expression: `e^(${value})` };
      case "sqrt":
        return { result: value < 0 ? "Error" : Math.sqrt(value), expression: `sqrt(${value})` };
      case "square":
        return { result: Math.pow(value, 2), expression: `(${value})^2` };
      case "fact":
        return {
          result: !Number.isInteger(value) || value < 0 ? "Error" : this.factorial(value),
          expression: `${value}!`,
        };
      default:
        return { result: value, expression: `${funcName}(${value})` };
    }
  }

  applyPendingFunctionToCurrent() {
    if (!this.pendingFunction) return false;
    const value = this.parseOperand(this.currentOperand);
    if (isNaN(value)) return false;
    const { result, expression } = this.evaluateUnaryFunction(this.pendingFunction, value);
    this.addToHistory(expression, result);
    this.lastExpression = expression;
    this.currentOperand = result.toString();
    this.cursorIndex = this.currentOperand.length;
    this.pendingFunction = null;
    this.pendingFunctionLabel = "";
    this.updateDisplay();
    return typeof result === "number" && isFinite(result);
  }

  insertAtCursor(value) {
    const idx = Math.min(Math.max(this.cursorIndex, 0), this.currentOperand.length);
    this.currentOperand =
      this.currentOperand.slice(0, idx) + value + this.currentOperand.slice(idx);
    this.cursorIndex = idx + value.length;
    this.updateDisplay();
  }

  saveState() {
    const snapshot = {
      currentOperand: this.currentOperand,
      previousOperand: this.previousOperand,
      operation: this.operation,
      history: this.history.map((item) => ({ ...item })),
      cursorIndex: this.cursorIndex,
      lastExpression: this.lastExpression,
      pendingFunction: this.pendingFunction,
      pendingFunctionLabel: this.pendingFunctionLabel,
    };
    this.undoStack.push(snapshot);
    if (this.undoStack.length > 25) {
      this.undoStack.shift();
    }
  }

  undoLast() {
    const snapshot = this.undoStack.pop();
    if (!snapshot) return;
    this.currentOperand = snapshot.currentOperand;
    this.previousOperand = snapshot.previousOperand;
    this.operation = snapshot.operation;
    this.history = snapshot.history;
    this.cursorIndex = snapshot.cursorIndex ?? this.currentOperand.length;
    this.lastExpression = snapshot.lastExpression ?? "";
    this.pendingFunction = snapshot.pendingFunction ?? null;
    this.pendingFunctionLabel = snapshot.pendingFunctionLabel ?? "";
    this.updateDisplay();
    this.renderHistory();
  }

  escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  setShiftControls(shiftButton, shiftMappings) {
    this.shiftButton = shiftButton;
    this.shiftMappings = (shiftMappings || []).filter((item) => item.element);
    this.applyShiftState();
  }

  toggleShift() {
    this.isShiftActive = !this.isShiftActive;
    this.applyShiftState();
  }

  applyShiftState() {
    if (!this.shiftMappings) return;
    if (this.shiftButton) {
      this.shiftButton.classList.toggle("btn-shift-active", this.isShiftActive);
      this.shiftButton.setAttribute("aria-pressed", this.isShiftActive ? "true" : "false");
    }
    this.shiftMappings.forEach((item) => {
      const state = this.isShiftActive ? item.secondary : item.primary;
      if (state.label !== undefined) {
        item.element.textContent = state.label;
      }
      if (state.function) {
        item.element.setAttribute("data-function", state.function);
      }
      if (state.operation) {
        item.element.setAttribute("data-operation", state.operation);
      }
    });
  }
}

const prevTextElement = document.getElementById("prev");
const currentTextElement = document.getElementById("curr");
const historyListElement = document.getElementById("history-list");
const historyPanelElement = document.getElementById("history-panel");
const clearHistoryButton = document.getElementById("clear-history");
const toggleHistoryButton = document.getElementById("toggle-history");
const darkToggleButton = document.getElementById("toggle-dark");
const shiftButton = document.querySelector('[data-shift="true"]');

const calculator = new Calculator(
  prevTextElement,
  currentTextElement,
  historyListElement,
  historyPanelElement
);

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

document.querySelectorAll("[data-function]").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.applyFunction(button.getAttribute("data-function"));
  });
});

document.querySelector("[data-equals]").addEventListener("click", () => {
  calculator.compute();
});

document.querySelector("[data-all-clear]").addEventListener("click", () => {
  calculator.clear();
});

clearHistoryButton.addEventListener("click", () => {
  calculator.clearHistory();
});

toggleHistoryButton.addEventListener("click", () => {
  calculator.toggleHistoryPanel();
});

document.querySelectorAll("[data-parenthesis]").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendParenthesis(button.getAttribute("data-parenthesis"));
  });
});

document.querySelector("[data-sign]").addEventListener("click", () => {
  calculator.toggleSign();
});

document.querySelector("[data-undo]").addEventListener("click", () => {
  calculator.undoLast();
});

document.querySelectorAll("[data-move]").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.moveCursor(button.getAttribute("data-move"));
  });
});

if (shiftButton) {
  const sinButton = document.querySelector('[data-function="sin"]');
  const cosButton = document.querySelector('[data-function="cos"]');
  const tanButton = document.querySelector('[data-function="tan"]');
  const logButton = document.querySelector('[data-function="log"]');
  const lnButton = document.querySelector('[data-function="ln"]');
  const sqrtButton = document.querySelector('[data-function="sqrt"]');
  const powerButton = document.querySelector('[data-operation="^"]');
  const rootButton = document.querySelector('[data-operation="root"]');
  const factButton = document.querySelector('[data-function="fact"]');

  const shiftMappings = [
    {
      element: sinButton,
      primary: { label: "sin", function: "sin" },
      secondary: { label: "sin⁻¹", function: "asin" },
    },
    {
      element: cosButton,
      primary: { label: "cos", function: "cos" },
      secondary: { label: "cos⁻¹", function: "acos" },
    },
    {
      element: tanButton,
      primary: { label: "tan", function: "tan" },
      secondary: { label: "tan⁻¹", function: "atan" },
    },
    {
      element: logButton,
      primary: { label: "log", function: "log" },
      secondary: { label: "10^x", function: "exp10" },
    },
    {
      element: lnButton,
      primary: { label: "ln", function: "ln" },
      secondary: { label: "e^x", function: "exp" },
    },
    {
      element: sqrtButton,
      primary: { label: "sqrt", function: "sqrt" },
      secondary: { label: "x²", function: "square" },
    },
    {
      element: powerButton,
      primary: { label: "x^y", operation: "^" },
      secondary: { label: "y√x", operation: "root" },
    },
    {
      element: rootButton,
      primary: { label: "yroot", operation: "root" },
      secondary: { label: "x^y", operation: "^" },
    },
    {
      element: factButton,
      primary: { label: "n!", function: "fact" },
      secondary: { label: "n!", function: "fact" },
    },
  ];

  calculator.setShiftControls(shiftButton, shiftMappings);
  shiftButton.addEventListener("click", () => {
    calculator.toggleShift();
  });
}

if (darkToggleButton) {
  let isDarkMode = false;
  darkToggleButton.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    darkToggleButton.setAttribute("aria-pressed", isDarkMode ? "true" : "false");
    darkToggleButton.classList.toggle("dark-toggle-active", isDarkMode);
  });
}
