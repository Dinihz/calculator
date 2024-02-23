const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const OPERATORS = ["%", "*", "/", "-", "+", "="];
let currentInput = "";

const calculate = (buttonValue) => {
  if (buttonValue === "=" && currentInput !== "") {
    // Calcula o resultado da expressão - Calculates the result of the expression
    currentInput = eval(currentInput.replace("%", "/100"));
  } else if (buttonValue === "AC") {
    // Limpa a entrada atual
    currentInput = "";
  } else if (buttonValue === "DEL") {
    // Remove o último caractere da entrada atual - Removes the last character from the current entry
    currentInput = currentInput.toString().slice(0, -1);
  } else {
    // Adiciona o valor do botão à entrada atual - Adds the value of the button to the current entry
    if (currentInput === "" && OPERATORS.includes(buttonValue)) return;
    currentInput += buttonValue;
  }

  // Atualiza o valor exibido no display - Updates the value shown on the display
  display.value = currentInput;
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
