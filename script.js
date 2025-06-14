// Select elements from the document
const result = document.querySelector("#result");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.querySelector(".btnClear");
const equalBtn = document.querySelector(".btnEqual");

let isCalculated = false;

function calResult() {
  try {
    let expression = result.textContent;

    if (expression.includes("x")) {
      expression = expression.replace("x", "*");
    }

    if (expression.includes("^")) {
      expression = expression.replace("^", "**");
    }

    if (expression.includes("%")) {
      const num = expression.replace("%", " ");
      expression = parseFloat(num) / 100;
    }

    let computedValue = eval(expression); // Evaluate the expression

    result.textContent = computedValue.toString();
    isCalculated = true;
  } catch {
    result.textContent = "Error";
  }
}

// Attach event listeners to buttons
const keys = ["x", "/", "+", "-", "%", "^", "."];
buttons.forEach((btn, index) => {
  btn.addEventListener("click", (event) => {
    const btnText = event.target.textContent;

    if (
      (btnText === "." && result.textContent.trim() === "") ||
      (btnText === "." && result.textContent.includes("Error"))
    ) {
      result.textContent = "0.";
    } else if (result.textContent.includes("Error")) {
      result.textContent = btn.textContent;
    } else {
      if (isCalculated) {
        // works if an operator is clicked after a completed calculation
        if (keys.includes(btnText)) {
          result.textContent += btnText;
        } else {
          result.textContent = btnText;
        }
        isCalculated = false;
      } else {
        result.textContent += btnText;
      }
    }
  });
});

clearBtn.addEventListener("click", () => {
  result.textContent = " ";
});

equalBtn.addEventListener("click", calResult);
