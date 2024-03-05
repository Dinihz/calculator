const lightTheme = "styles/style-light.css"
const darkTheme = "styles/style-dark.css"
const sunICon = "assets/sun.svg"
const moonICon = "assets/moon.svg"
const themeIcon = document.getElementById("theme-icon")
const githublightIcon = "assets/githlight.svg"
const githubdarkIcon = "assets/githubdark.svg"
const githubICon = document.getElementById("github-icon")
const previusoperationText = document.querySelector("#previous")
const currentoperationText = document.querySelector("#current")
const buttons = document.querySelectorAll("#buttons-container button")

function changeTheme() {
    const theme = document.getElementById("theme");
    if (theme.getAttribute("href") === lightTheme) {
        theme.setAttribute("href", darkTheme);
        themeIcon.setAttribute("src", sunICon);
        githubICon.setAttribute("src", githublightIcon);

    } else {
        theme.setAttribute("href", lightTheme);
        themeIcon.setAttribute("src", moonICon);
        githubICon.setAttribute("src", githubdarkIcon);
    }
}

class Calculator {
    constructor(previusoperationText, currentoperationText) {
        this.previusoperationText = previusoperationText
        this.currentoperationText = currentoperationText
        this.currentOperation = ""
    }
    //add digit Oo screen
    addDigit(digit) {
        //check if current operation alredy has a dot
        if(digit === "." && this.currentoperationText.innerText.includes(".")) {
            return;
        }


        this.currentOperation = digit
        this.updateScreen()
    }

    //Process all calculator operations
    processOperation(operation) {
        //check if current is empty
        if(this.currentoperationText.innerText === "" && operation !== "C") {
            //Change operation
            if(this.previusoperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        

        //get current and previous value
        let operationValue
        const previous = +this.previusoperationText.innerText.split(" ")[0];
        const current = +this.currentoperationText.innerText;

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
            this.processdelOperator();
            break;
        case "CE":
            this.processclearcurrentOperaion();
            break;
        case "C":
            this.processclearOperation();
            break;
        case "=":
            this.processequalOperator();
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
                this.currentoperationText.innerText += this.currentOperation;
            } else {
                //check if value is zero, if it is just add currrent value
                if(previous === 0) {
                    operationValue = current
                }
                
                //add current value to previus
                this.previusoperationText.innerText = `${operationValue} ${operation}`
                this.currentoperationText.innerText = "";

            }
        }

   //change math operation  
    changeOperation(operation) {

        const mathOperations = ["%", "*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return;
        }

        this.previusoperationText.innerText = this.previusoperationText.innerText.slice(0, -1) + operation;

    }

    ///delete the last digit
    processdelOperator() {
        this.currentoperationText.innerText = this.currentoperationText.innerText.slice(0, -1)
    }

    //clar current operation
    processclearcurrentOperaion() {
        this.currentoperationText.innerText = "";
    }

    //clear all operations
    processclearOperation() {
        this.currentoperationText.innerText = "";
        this.previusoperationText.innerText = "";
    }

    //process an operation
    processequalOperator() {
        const operation = previusoperationText.innerHTML.split(" ")[1];
        this.processOperation(operation);
    }

}

const calc = new Calculator(previusoperationText, currentoperationText)

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

