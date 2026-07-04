/**
 * DO NOT MODIFY THIS FILE! 
 * This file contains all of the unit tests for the `Calculator` class.
 * This will be used by the autograder to test the correctness of your implementation.
 * 
 * You may also run this locally if you would like to check your work or aid in
 * debugging. To do so, run the following command:
 * `npm run test`
 * 
 * This will run the tests in this file and output the results to the console.
 */

import { describe, expect, test, beforeEach } from 'vitest';
import { Calculator } from './calculator';
import { SupportedOperation } from './operation';

// Create a test suite for the Calculator object.
describe('Calculator', () => {

    // Calculator object to be used in the tests.
    let calculator: Calculator;
    
    // Create a new instance of the Calculator object before each test.
    beforeEach(() => {
        calculator = new Calculator();
    });

    // Test the addDigit method.
    test('Adding a digit to a non-zero display should append the digit to the display.', () => {
        calculator.display = '1';
        calculator.addDigit("2");
        expect(calculator.display).toBe('12');
    });

    test('Adding a digit that is not a decimal point should cause the display to reformat.', () => {
        calculator.display = '123';
        calculator.addDigit("4");
        expect(calculator.display).toBe('1,234');
    });

    test('Adding a digit that is a decimal point should not cause the display to reformat.', () => {
        calculator.display = '123';
        calculator.addDigit(".");
        expect(calculator.display).toBe('123.');
    });

    test('Adding a zero after a decimal point should not cause the display to reformat.', () => {
        calculator.display = '123.';
        calculator.addDigit("0");
        expect(calculator.display).toBe('123.0');
    });

    test('Adding a digit when the screen is 0 should change the 0 to the digit.', () => {
        calculator.addDigit("5");
        expect(calculator.display).toBe('5');
    });

    test('No decimal point should be added if one already exists on the display.', () => {
        calculator.display = '5.5';
        calculator.addDigit(".");
        expect(calculator.display).toBe('5.5');
    });

    // Test the selectOperation method.
    test('Selecting the add operation should change the selected operation to the correct object.', () => {
        calculator.selectOperation(SupportedOperation.Add);
        expect(calculator.selectedOperation?.symbol).toBe("+");
        expect(calculator.selectedOperation?.operator(2)).toBe(2);
        calculator.previousSolution = "12";
        expect(calculator.selectedOperation?.operator(2)).toBe(14);
    });

    test('Selecting the subtract operation should change the selected operation to the correct object.', () => {
        calculator.selectOperation(SupportedOperation.Subtract);
        expect(calculator.selectedOperation?.symbol).toBe("-");
        expect(calculator.selectedOperation?.operator(2)).toBe(-2);
        calculator.previousSolution = "12";
        expect(calculator.selectedOperation?.operator(2)).toBe(10);
    });

    test('Selecting the multiply operation should change the selected operation to the correct object.', () => {
        calculator.selectOperation(SupportedOperation.Multiply);
        expect(calculator.selectedOperation?.symbol).toBe("*");
        expect(calculator.selectedOperation?.operator(2)).toBe(0);
        calculator.previousSolution = "12";
        expect(calculator.selectedOperation?.operator(2)).toBe(24);
    });

    test('Selecting the divide operation should change the selected operation to the correct object.', () => {
        calculator.selectOperation(SupportedOperation.Divide);
        expect(calculator.selectedOperation?.symbol).toBe("/");
        expect(calculator.selectedOperation?.operator(2)).toBe(0);
        calculator.previousSolution = "12";
        expect(calculator.selectedOperation?.operator(2)).toBe(6);
    });

    test('Selecting a new operation when one was already active should perform the calculation and store it in the previous solution.', () => {
        calculator.display = '123';
        calculator.selectOperation(SupportedOperation.Add);
        calculator.display = '456';
        calculator.selectOperation(SupportedOperation.Subtract);
        expect(calculator.previousSolution).toBe('579');
    });

    // Test the calculate method.
    test('Calculating with no selected operation should not change the display.', () => {
        calculator.display = '123';
        calculator.calculate();
        expect(calculator.display).toBe('123');
    });

    test('Calculating with no previous solution should not change the display.', () => {
        calculator.display = '123';
        calculator.selectOperation(SupportedOperation.Add);
        calculator.calculate();
        expect(calculator.display).toBe('123');
    });

    test('Calculating with a selected operation and previous solution should change the display.', () => {
        calculator.display = '123';
        calculator.selectOperation(SupportedOperation.Add);
        calculator.display = '456';
        calculator.calculate();
        expect(calculator.display).toBe('579');
    });

    // Test the clear method.
    test('Clearing the display should set it to 0 and all memory.', () => {
        calculator.display = '123';
        calculator.clear();
        expect(calculator.display).toBe('0');
        expect(calculator.previousSolution).toBe(null);
        expect(calculator.selectedOperation).toBe(null);
    });

    // Test the cancelOperation method.
    test('Cancelling the operation should clear the selected operation and replace the display with the previous solution.', () => {
        calculator.display = '123';
        calculator.selectOperation(SupportedOperation.Add);
        calculator.display = '456';
        calculator.cancelOperation();
        expect(calculator.selectedOperation).toBe(null);
        expect(calculator.previousSolution).toBe(null);
        expect(calculator.display).toBe('123');
    });

    // Test the toggleSign method.
    test('Toggling the sign of a positive number should make it negative.', () => {
        calculator.display = '123';
        calculator.toggleSign();
        expect(calculator.display).toBe('-123');
    });

    test('Toggling the sign of a negative number should make it positive.', () => {
        calculator.display = '-123';
        calculator.toggleSign();
        expect(calculator.display).toBe('123');
    });

    // Test the backspace method.
    test('Backspacing a number should remove the last digit if length is greater than 1.', () => {
        calculator.display = '123';
        calculator.backspace();
        expect(calculator.display).toBe('12');
    });

    test('Backspacing a number should set the display to 0 if length is 1.', () => {
        calculator.display = '1';
        calculator.backspace();
        expect(calculator.display).toBe('0');
    });

    test('Backspacing a negative number with one digit should become 0', () => {
        calculator.display = '-8';
        calculator.backspace();
        expect(calculator.display).toBe('0');
    });

});