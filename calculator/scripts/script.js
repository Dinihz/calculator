const lightTheme = "styles/style-light.css"
const darkTheme = "styles/style-dark.css"
const sunICon = "assets/sun.svg"
const moonICon = "assets/moon.svg"
const themeIcon = document.getElementById("theme-icon")
const githublightIcon = "assets/githlight.svg"
const githubDarkIcon = "assets/githubdark.svg"
const githubICon = document.getElementById("github-icon")
const previusOperationText = document.querySelector("#previous")
const currentOperationText = document.querySelector("#current")
const buttons = document.querySelectorAll("#buttons-container button")

function changeTheme() {
    const theme = document.getElementById("theme");
    if (theme.getAttribute("href") === lightTheme) {
        theme.setAttribute("href", darkTheme);
        themeIcon.setAttribute("src", sunICon);
        githubICon.setAttribute("src", githublightIcon);
        return;
    } else {
        theme.setAttribute("href", lightTheme);
        themeIcon.setAttribute("src", moonICon);
        githubICon.setAttribute("src", githubDarkIcon);
    }
}

class Calculator {
    constructor(previusOperationText, currentOperationText) {
        this.previusOperationText = previusOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    //add digit Oo screen
    addDigit(digit) {
        //check if current operation alredy has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }


        this.currentOperation = digit
        this.updateScreen()
    }

    //Process all calculator operations
    processOperation(operation) {
        //check if current is empty
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            //Change operation
            if(this.previusOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        

        //get current and previous value
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

    //chance values the screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
        ) {
        
            console.log(operationValue, operation, current, previous)
        
            if(operationValue === null) {
                this.currentOperationText.innerText += this.currentOperation;
            } else {
                //check if value is zero, if it is just add currrent value
                if(previous === 0) {
                    operationValue = current
                }
                
                //add current value to previus
                this.previusOperationText.innerText = `${operationValue} ${operation}`
                this.currentOperationText.innerText = "";

            }
        }

   //change math operation  
    changeOperation(operation) {

        const mathOperations = ["%", "*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return;
        }

        this.previusOperationText.innerText = this.previusOperationText.innerText.slice(0, -1) + operation;

    }

    ///delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    //clar current operation
    processClearCurrentOperaion() {
        this.currentOperationText.innerText = "";
    }

    //clear all operations
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previusOperationText.innerText = "";
    }

    //process an operation
    processEqualOperator() {
        const operation = previusOperationText.innerHTML.split(" ")[1];
        this.processOperation(operation);
    }

}

const calc = new Calculator(previusOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    });
});

