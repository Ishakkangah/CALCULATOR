// LATIHAN 1
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear();
    }

    clear() {
        this.currentElement = '';
        this.previousElement = '';
        this.operation = undefined;
    }

    dalete() {
        if (this.currentElement != '') {
            this.currentElement = this.currentElement.toString().slice(0, -1);
        }
    }

    appendNumber(number) {
        if (number == '.' && this.currentElement.includes('.')) return
        this.currentElement = this.currentElement.toString() + number;
    }

    chooseOperation(operation) {
        if (this.currentElement == '') return
        if (this.previousElement != '') {
            this.computed();
        }
        this.operation = operation
        this.previousElement = this.currentElement;
        this.currentElement = ''
    }

    computed() {
        let computation;
        const previous = parseFloat(this.previousElement)
        const current = parseFloat(this.currentElement)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '*':
                computation = previous * current;
                break;
            case '/':
                computation = previous / current;
                break;
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            default:
                return;
        }
        this.currentElement = computation;
        this.previousElement = '';
        this.operation = undefined;
    }

    getDisplayUpdate(number) {
        const stringNumber = number.toString(); // nomor jadi string
        const integerDigits = parseFloat(stringNumber.split('.')[0]); // string di split ambek array ke-0
        const decimalDigits = stringNumber.split('.')[1] // string ambil array ke-1
        let integerDisplay; // varible kosong
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
        console.log(integerDigits)
        console.log(decimalDigits)
        console.log('typeOf: ', typeof (integerDigits));
    }

    updateDisplay() {
        this.currentOperandTextElement.innerHTML = this.getDisplayUpdate(this.currentElement);
        if (this.operation != null) {
            this.previousOperandTextElement.innerHTML = `${this.previousElement} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerHTML = this.previousElement
        }
    }


}

const dataNumbers = document.querySelectorAll('[data-number]');
const dataOperations = document.querySelectorAll('[data-operation]');
const dataClearAll = document.querySelector('[data-clear-all]');
const dataDelete = document.querySelector('[data-delete]');
const dataEquals = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[previousOperandTextElement]');
const currentOperandTextElement = document.querySelector('[currentOperandTextElement]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

dataNumbers.forEach(number => {
    number.addEventListener('click', function (e) {
        calculator.appendNumber(e.target.innerHTML);
        calculator.updateDisplay();
    });
})

dataOperations.forEach(operation => {
    operation.addEventListener('click', function (e) {
        calculator.chooseOperation(e.target.innerHTML);
        calculator.updateDisplay();
    });
});

dataEquals.addEventListener('click', function () {
    calculator.computed()
    calculator.updateDisplay();
});


dataClearAll.addEventListener('click', function () {
    calculator.clear()
    calculator.updateDisplay();
});


dataDelete.addEventListener('click', function () {
    calculator.dalete()
    calculator.updateDisplay();
});
















