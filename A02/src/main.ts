/**
 * DO NOT MODIFY THIS FILE! 
 * This file connects the HTML elements to the calculator functionality
 * defined in the `calculator.ts` file.
 */

import { Calculator } from "./calculator";
import { SupportedOperation } from "./operation";

// Defines the `Calculator` instance that will be used by this application.
const calculator = new Calculator();

/** Updates the display to reflect the current state of the calculator. */
const updateDisplay = () => {
    const display = document.getElementById('display')!;
    display.textContent = calculator.display;
    const previousValueDisplay = document.getElementById('previous-value')!;
    previousValueDisplay.textContent = calculator.previousSolution ?? '';
    const activeOperationDisplay = document.getElementById('active-operation')!;
    activeOperationDisplay.textContent = calculator.selectedOperation?.symbol ?? '';
}

/** 
 * Add event listeners to the buttons so that each calculator
 * button calls a Calculator method when clicked.
 */

// Add event handlers for the digits.

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

for(let digit of digits) {
    const button = document.getElementById(`${digit}-button`)!;
    button.addEventListener('click', () => {
        console.log(`${digit} pressed!`); // Helper for student debugging
        calculator.addDigit(digit);
        updateDisplay();
    });
}

// Add keyboard event handling for the digits.
document.addEventListener('keydown', (event) => {
    const digit = event.key;
    if (digits.includes(digit)) {
        console.log(`${digit} pressed!`); // Helper for student debugging
        calculator.addDigit(digit);
        updateDisplay();
    }
});

// Add event handlers for the operations.

const addButton = document.getElementById('add-button')!;
addButton.addEventListener('click', () => {
    console.log(`Add button pressed!`); // Helper for student debugging
    calculator.selectOperation(SupportedOperation.Add);
    updateDisplay();
});
document.addEventListener('keydown', (event) => {
    if (event.key === "+") {
        console.log(`Add button pressed!`); // Helper for student debugging
        calculator.selectOperation(SupportedOperation.Add);
        updateDisplay();
    }
});

const subtractButton = document.getElementById('subtract-button')!;
subtractButton.addEventListener('click', () => {
    console.log(`Subtract button pressed!`); // Helper for student debugging
    calculator.selectOperation(SupportedOperation.Subtract);
    updateDisplay();
});
document.addEventListener('keydown', (event) => {
    if (event.key === "-") {
        console.log(`Subtract button pressed!`); // Helper for student debugging
        calculator.selectOperation(SupportedOperation.Subtract);
        updateDisplay();
    }
});


const multiplyButton = document.getElementById('multiply-button')!;
multiplyButton.addEventListener('click', () => {
    console.log(`Multiply button pressed!`); // Helper for student debugging
    calculator.selectOperation(SupportedOperation.Multiply);
    updateDisplay();
});
document.addEventListener('keydown', (event) => {
    if (event.key === "*") {
        console.log(`Multiply button pressed!`); // Helper for student debugging
        calculator.selectOperation(SupportedOperation.Multiply);
        updateDisplay();
    }
});

const divideButton = document.getElementById('divide-button')!;
divideButton.addEventListener('click', () => {
    console.log(`Divide button pressed!`); // Helper for student debugging
    calculator.selectOperation(SupportedOperation.Divide);
    updateDisplay();
});
document.addEventListener('keydown', (event) => {
    if (event.key === "/") {
        console.log(`Divide button pressed!`); // Helper for student debugging
        calculator.selectOperation(SupportedOperation.Divide);
        updateDisplay();
        }
});

const signButton = document.getElementById('sign-button')!;
signButton.addEventListener('click', () => {
    console.log(`Sign button pressed!`); // Helper for student debugging
    calculator.toggleSign();
    updateDisplay();
});

// Add the event handler for the equals button.

const equalsButton = document.getElementById('equals-button')!;
equalsButton.addEventListener('click', () => {
    console.log(`Equals button pressed!`); // Helper for student debugging
    calculator.calculate();
    updateDisplay();
});
document.addEventListener('keydown', (event) => {
    if (event.key === "=" || event.key === "Enter") {
        console.log(`Equals button pressed!`); // Helper for student debugging
        calculator.calculate();
        updateDisplay();    
    }
});

// Add the event handler for the clear and backspace buttons.

const clearButton = document.getElementById('clear-button')!;
clearButton.addEventListener('click', () => {
    console.log(`Clear button pressed!`); // Helper for student debugging
    calculator.clear();
    updateDisplay();
});

const backspaceButton = document.getElementById('backspace-button')!;
backspaceButton.addEventListener('click', () => {
    console.log(`Backspace button pressed!`); // Helper for student debugging
    calculator.backspace();
    updateDisplay();
});
document.addEventListener('keydown', (event) => {
    if (event.key === "Backspace") {
        console.log(`Backspace button pressed!`); // Helper for student debugging
        calculator.backspace();
        updateDisplay();    
    }
});