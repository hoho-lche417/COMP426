/**
 * File containing the main component for the Connections page.
 */

import { useState } from "react";
import Header from "../ui/Header";
import ConnectionsTile from "./ConnectionsTile";
import ConnectionsCompletedRow from "./ConnectionsCompletedRow";
import { emptySet } from "../utils/collections";
import ConnectionsButton from "../ui/ConnectionsButton";
import ConnectionsMistakesCounter from "./ConnectionsMistakesCounter";
import { useShakeTiles } from "../hooks/useShakeTiles";
import { useToast } from "../hooks/useToast";
import Toast from "../ui/Toast";
import ConnectionsResults from "./results/ConnectionsResults";
import { ConnectionsGameAnswer, GameStatus } from "./types";

export default function ConnectionsPage() {
  /** State variables and their initial values are given: DO NOT MODIFY. */

  // Stores the current status of the game.
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const gameOver = gameStatus === "won" || gameStatus === "lost";

  // Stores the current tiles selected for the current guess.
  // NOTE: This is initialized as a set for O(1) lookups - order
  // does not matter.
  const [currentSelection, setCurrentSelection] =
    useState<Set<string>>(emptySet());

  // Stores the previous guesses made before the current round.
  // NOTE: Previous guesses are respresented as a set for O(1) lookups and
  // order does not matter.
  const [previousGuesses, setPreviousGuesses] = useState<Set<string>[]>([]);

  // Stores the number of guesses left before game over occurs.
  const [guessesLeft, setGuessesLeft] = useState<number>(4);

  // Stores the remaining options to select from for guessing.
  const [optionsLeft, setOptionsLeft] = useState<string[]>([]);

  // Stores the categories that have been correctly guessed, ordered by
  // the order the categories were revealed.
  const [revealedAnswers, setRevealedAnswers] = useState<
    ConnectionsGameAnswer[]
  >([]);

  // Stores the remaining categories left to guess.
  const [leftToGuess, setLeftToGuess] = useState<ConnectionsGameAnswer[]>([]);

  // Stores the original set of all categories / answers for the game.
  // NOTE: This should be set once at the start of the game and not changed again.
  const [originalAnswers, setOriginalAnswers] = useState<
    ConnectionsGameAnswer[]
  >([]);

  /**
   * TODO: Load a Connections puzzle from the external API.
   *
   * As noted in the assignment write-up, you can use the following
   * API call to get a random puzzle:
   * GET https://comp426-apis.vercel.app/api/connections
   *
   * The response JSON should be of type `ConnectionsGameResponse`, so
   * casting to this type should be safe.
   *
   * You should also set values to the necessary states based on the
   * puzzle retrieved from the API.
   */

  // YOUR IMPLEMENTATION HERE

  /**
   * TODO: The `selectOption` handler runs when a user presses on a tile.
   * Implement this handler so that pressing on a tile either adds or
   * removes the tile from the current selection based on whether it is
   * already currently selected or not.
   *
   * Remember that only a maximum of four tiles should be selectable at a time.
   */
  const selectOption = (option: string) => {};

  // Determines whether the deselect button should be enabled.
  const canDeselectAll = currentSelection.size > 0;

  /**
   * TODO: The `deselectAll` handler runs when a user presses on the "Deselect All"
   * button. Implement the necessary functionality for this handler.
   */
  const deselectAll = () => {};

  /**
   * TODO: The `shuffle` handler runs when a user presses on the "Shuffle" button.
   * Implement the necessary functionality for this handler.
   *
   * HINT: You may use any of the exported helper functions in the `utils/collections.ts`
   * file.
   */
  const shuffle = () => {};

  // Determines whether or not the guess button should be enabled.
  let canGuess = currentSelection.size === 4;

  // Custom hook that abstracts functionality for showing toasts on the screen.
  //
  // NOTE:  A *toast* is a small pop-up at the bottom of the screen with some text that disappears
  // after a few seconds. You may use the `showToast(message)` method, provided by the hook below,
  // to make a toast appear on the screen with the message. You may ignore `isVisible` and `message`,
  // which are state variables that is used by the UI to handle showing the toast.
  //
  // EXAMPLE USAGE:
  // ```typescript
  // showToast("Foo!");
  // ```
  const { showToast, isVisible, message } = useToast();

  // Custom hook that abstracts functionality for shaking currently selected tiles, which typically
  // animates when the user guesses incorrectly.
  //
  // To shake tiles, use `shakeTiles(currentSelection)`. You may ignore `shouldShake`, which is a
  // state variable used by the UI to handle the shaking animation.
  //
  // EXAMPLE USAGE:
  // ```typescript
  // shakeTiles(currentSelection);
  // ```
  const { shouldShake, shakeTiles } = useShakeTiles();

  /**
   * TODO: The `guess` handler runs when a user presses the "Guess" button. This handler
   * will contain most of the logic for the Connections game.
   *
   * When a user presses `guess`, may consider the `currentSelection` to be the user's guess.
   *
   * Your implementations must satisfy these requirements:
   * 1. If a guess has been made before, a toast should be shown with the text "Already guessed."
   * 2. If a guess is new, there are three possibilities:
   *    - If all four selected tiles in a guess match the answers for a category, the user reveals
   *      the category! Modify the necessary states so that the newly discovered answer is revealed
   *      and the selected tiles are no longer left to choose.
   *          - If this guess reveals the final category, the game has been won! Call the
   *            `handleGameWin()` handler so that the game can end.
   *          - Otherwise, continue on with the game.
   *    - If three of the four selected tiles in a guess match the answers for a category, this means
   *      the users guess is "one away" from a correct answer and we should alert the user (which happens
   *      in the real Connections game). You should (1) shake the incorrect tiles and (2) show a toast
   *      with the text "One away..."
   *    - Otherwise, if the guess is incorrect, you should just shake the incorrect tiles with no toast.
   * 3. If the user runs out of guesses, the game has been lost. Call the `handleGameLoss` handler so
   *    the game can end.
   * 4. Make sure to decrease the number of guesses remaining as incorrect guesses are made.
   *
   * HINT 1: You may compare two sets together using the `countSetOverlap(set1, set2)` function provided
   * in the `utils/collections.ts` file.'
   *
   * HINT 2: Remember that to trigger state changes in React, you must supply a ***brand new object*** into
   * the setter function for a state, not just modify an existing reference! You may use the `addToSet` and
   * `deleteFromSet` functions in the `utils/collections.ts` file to generate new set objects (differerent
   * references) when modifying sets. You may use TypeScript's spread syntax to create new arrays based on
   * old arrays, which is a very common technique used in React projects, like so:
   *
   * ```
   * const newArray = [...oldArray, newValue];
   * // OR
   * const newArray = [...oldArray.filter(item => item !=== itemToDelete)];
   * ```
   *
   * To learn more about this, check out the official React docs here:
   * https://react.dev/learn/updating-arrays-in-state
   */
  const guess = () => {};

  /**
   * TODO: The `handleGameWin` handler runs whenever a game is won. The handler should:
   * - After a 1000ms delay, show a toast with the text "Congratulations!"
   * - After an additional 2000ms, set the game status to `"won"`.
   */
  const handleGameWin = () => {};

  /**
   * TODO: The `handleGameLoss` handler runs whenever a game is lost. The handler should:
   * - After a 1000ms delay, show a toast with the text "Game over."
   * - After an additional 2000ms, remove all remaining options and reveal all answers.
   *   Then, show a toast with the text "Better luck next time!"
   * - Finally, after an additional 2000ms, set the game status to `"lost"`.
   */
  const handleGameLoss = () => {};

  return (
    <div className="flex h-svh max-h-svh w-full flex-col items-center gap-5 overflow-hidden">
      <Header />
      {gameOver && (
        <ConnectionsResults
          status={gameStatus}
          guesses={previousGuesses}
          answers={originalAnswers}
        />
      )}
      {!gameOver && (
        <>
          <p className="font-nyt-body font-light">
            Create four groups of four!
          </p>
          <div className="grid w-auto grid-cols-4 gap-2 md:w-xl">
            {revealedAnswers.map((answer) => (
              <ConnectionsCompletedRow key={answer.category} answer={answer} />
            ))}

            {optionsLeft.map((option) => (
              <ConnectionsTile
                key={option}
                selected={currentSelection.has(option)}
                option={option}
                shouldShake={shouldShake(option)}
                onClick={() => selectOption(option)}
              />
            ))}
          </div>
          <ConnectionsMistakesCounter mistakesRemaining={guessesLeft} />
          <div className="flex w-full flex-row justify-center gap-3">
            <ConnectionsButton label="Shuffle" onClick={shuffle} />
            <ConnectionsButton
              label="Deselect All"
              enabled={canDeselectAll}
              onClick={deselectAll}
            />
            <ConnectionsButton
              label="Submit"
              enabled={canGuess}
              onClick={guess}
            />
          </div>
        </>
      )}
      <Toast isVisible={isVisible} message={message} />
    </div>
  );
}
