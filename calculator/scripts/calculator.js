const previusOperationText = document.querySelector("#previous")
const currentOperationText = document.querySelector("#current")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previusOperationText, currentOperationText) {
        this.previusOperationText = previusOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    // Add digit Oo screen
    addDigit(digit) {
        // check if current operation alredy has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }


        this.currentOperation = digit
        this.updateScreen()
    }

    // Process all calculator operations
    processOperation(operation) {
        // Check if current is empty
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            //Change operation
            if(this.previusOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Get current and previous value
        let operationValue
        const previous = +this.previusOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
        case "+":
            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "-":
            operationValue = previous - current
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "/":
            operationValue = previous / current
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "*":
            operationValue = previous * current
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "%":
            operationValue = previous % current
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "DEL":
            this.processDelOperator();
            break;
        case "CE":
            this.processClearCurrentOperaion();
            break;
        case "C":
            this.processClearOperation();
            break;
        case "=":
            this.processEqualOperator();
            break;
        default:
            return;
        }
    }

    // Chance values the screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null) {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
            return; // Terminate execution of the function here
        }
    
        // Checks if the value is zero and, if it is, updates operationValue to current
        if (previous === 0) {
            operationValue = current;
        }
    
        // Updates the texts on the screen
        this.previusOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = "";
    }
    

   //change math operation  
    changeOperation(operation) {

        const mathOperations = ["%", "*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return;
        }

        this.previusOperationText.innerText = this.previusOperationText.innerText.slice(0, -1) + operation;

    }

    /// Delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    // Clar current operation
    processClearCurrentOperaion() {
        this.currentOperationText.innerText = "";
    }

    // Clear all operations
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previusOperationText.innerText = "";
    }

    // Process an operation
    processEqualOperator() {
        const operation = previusOperationText.innerHTML.split(" ")[1];
        this.processOperation(operation);
    }

}

const calc = new Calculator(previusOperationText, currentOperationText)

function handleButtonClick(e) {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
        return calc.addDigit(value);
    }

    calc.processOperation(value);
}

buttons.forEach((btn) => {
    btn.addEventListener("click", handleButtonClick);
});
