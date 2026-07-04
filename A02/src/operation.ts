/**
 * DO NOT MODIFY THIS FILE! 
 * This file contains type declarations for the calculator operations.
 */

/** Type declaration for a calculator operation. */
export interface CalculatorOperation {
    // Symbol for the operation (for example, "+" for addition).
    symbol: string
    // Operator function that, when supplied a second operand 
    // and combined with the first operand (supplied from the
    // closure), returns the result of the operation.
    operator: (operand: number) => number
}

/** Enum storing the calculator's supported operations. */
export enum SupportedOperation {
    Add,
    Subtract,
    Multiply,
    Divide
}