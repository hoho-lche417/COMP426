import { CalculatorOperation, SupportedOperation } from "./operation";

/**
 * Defines the Calculator object, which stores the calculator's state (current value)
 * and contains the calculator's functionality, exposed through methods.
 * 
 * All of the work for a02 will be done in this file!
 */
export class Calculator {

    /** Stores the text to appear on the calculator's display. */
    display: string = '0';

    /**
     * Stores the calculator's previous solution, if any. 
     * This is used for us to perform arithmetic calculations, as 
     * well as to cancel operations and revert back to the calculator's
     * previous state if needed.
     * */
    previousSolution: string | null = null;

    /**
     * Stores the currently selected arithmetic operation, if any.
     * For example, if the user pressed the "+" button on the calculator,
     * the selected operation would change from null to a `CalculatorOperation`
     * object representing the addition operation.
     */
    selectedOperation: CalculatorOperation | null = null;

    /** Constructor - is blank since all fields are pre-populated. */
    constructor() {}

    /**
     * Adds a digit to the calculator's display.
     * 
     * For example, if the display is "8", calling addDigit("2") will change
     * the display to "82".
     * 
     * There is also a helper function in `utils.ts` called `reformatDisplayText`,
     * which will correctly format the display text. It is important to reformat
     * the display text after adding a digit to ensure that the display is always
     * correctly formatted. For example, if the display reads "123" and the user
     * presses the "4" button without reformatting, the display would read "1234".
     * Instead, we want the display to be reformatted so it displays "1,234".
     * 
     * There are a few special cases to consider:
     * - If the display is "0":
     *       The display should change to the digit being added, rather than
     *       appending the digit to the end of the display. For example,
     *       calling addDigit("3") when the display is "0" should change the
     *      display to "3", not "03".
     * - If the display already contains a decimal point:
     *      The display should not add a second decimal point. For example,
     *      if the display reads "3.14", calling addDigit(".") should do nothing.
     * - If the inputted digit is a decimal (.) or 0 (when a decimal is in the display):
     *      Do not reformat the display text as mentioned above. Imagine the 
     *      user is trying to type "123.4". Once the user types the ".",
     *      reformatting "123." would result in "123", preventing the user from
     *      typing the "4". Or, if the user was trying to type "123.08", once the
     *      user types the "0", reformatting "123.0" would result in "123", which
     *      prevents the user from typing the ".08"! 
     * 
     * @param digit: String representation of the digit to add to the display,
     * passed in from `main.ts` when a digit button is clicked.
     */
    addDigit(digit: string): void {
        // TODO: Implement the `addDigit` method.

    }

    /**
     * This method handles when a user clicks an operation button on the calculator,
     * storing this operation so that it can be applied after the user types in
     * the second operand.
     * 
     * This method takes in a `SupportedOperation` enum value, which is defined in
     * `operation.ts`. This value is passed in from `main.ts` when an operation button
     * is clicked on the calculator. Depending on the passed in operation enum value,
     * we want to set the `selectedOperation` field to an appropriate `CalculatorOperation`.
     * 
     * This method should perform three steps:
     * 1. If there is *already* a selected operation, that means that the user is chaining
     *    operations together (for example, 2 + 3 + 4). Therefore, we want to perform the
     *    calculation immediately before continuing on with future steps.
     *    Hint: You should just use the `calculate` method to perform the calculation.
     * 2. Set the `selectedOperation` field to the appropriate `CalculatorOperation` object.
     *    Learn more about the `CalculatorOperation` interface in `operation.ts`. Depending
     *    on the inputted `operation`, you want to set the `selectedOperation` field to an
     *    object with the appropriate values set to the fields. You will need to determine
     *    the correct symbol and operator function to set based on the inputted `operation`!
     *    Note: The operator function only takes in the second operand. The first operand
     *          should be determined based on the `previousSolution` field.
     * 3. Assign `previousSolution` to the current display's value. This will
     *    allow the user to type in the second operand after selecting an operation. Then,
     *    set the display to 0 so that the user can type in the second operand.
     * 
     * @param operation: `SupportedOperation` enum value representing the operation to perform.
     */
    selectOperation(operation: SupportedOperation): void {
        // TODO: Implement the `selectOperation` method.

    }

    /**
     * Calculates the solution to the calculation inputted by the user.
     * 
     * This method should only do anything if there is a selected operation set.
     * Run the calculation using the selected operation's operator function and
     * update the display with the solution. Also, clear the previous solution
     * and selected operation to prepare for a new calculation.
     * 
     * Note: Again, the display is a `string`, not a number. You can make use of
     * the `displayTextToNumber` and `numberToDisplayText` functions, defined in 
     * `utils.ts`, to help you convert between the two types.
     */
    calculate() {
        // TODO: Implement the `calculate` method.
        
    }

    /**
     * Cancels the current operation, reverting the display to the previous solution
     * (if it exists, otherwise it should revert to 0) and clear the previous
     * solution and selected operation. This allows the user to return back to their
     * previous value and start a new calculation if they wish.
     */
    cancelOperation() {
        // TODO: Implement the `cancelOperation` method.

    }

    /**
     * Clears the calculator's display, previous solution, and selected operation.
     * This allows the user to start a new calculation from scratch.
     * 
     * In the case where an operation is selected, instead of doing the above, just
     * cancel the operation (using the previous `cancelOperation()` method)!
     */
    clear() {
        // TODO: Implement the `clear` method.

    }

    /**
     * Toggles the sign of the current value on the calculator's display.
     * 
     * For example, if the display is "8", calling this method will change
     * the display to "-8". If the display is "-8", calling this method will
     * change the display to "8".
     * 
     * Hint: The value of the calculator's current display is a `string`, not
     * a number. You can make use of the `displayTextToNumber` and `numberToDisplayText`
     * functions, defined in `utils.ts`, to help you convert between the two types.
     */
    toggleSign(): void {
        // TODO: Implement the `toggleSign` method.

    }

    /**
     * Deletes the last character from the current value on the calculator's display.
     * 
     * In the case where the display is only a single character, the display should
     * just be reset to "0" rather than no characters.
     * 
     * In the case where the only character left after backspacing just a negative sign,
     * the display should also be reset to "0" rather than "-".
     */
    backspace() {
        // TODO: Implement the `backspace` method.

    }
}
