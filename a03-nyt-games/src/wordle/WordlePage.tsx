import { useEffect, useState } from "react";
import TileRow from "./TileRow";
import Keyboard from "./Keyboard";
import WordleResults from "./results/WordleResults";
import Header from "../ui/Header";
import { GameStatus } from "../connections/types";
import { useToast } from "../hooks/useToast";
import Toast from "../ui/Toast";

export default function WordlePage() {
  /** State variables and their initial values are given: DO NOT MODIFY. */

  // Stores the current status of the game.
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const gameOver = gameStatus === "won" || gameStatus === "lost";

  // Stores the correct answer for the game.
  const [targetWord, setTargetWord] = useState<string>("");

  // Stores a list of past guesses.
  // Invariant: This list should always remain 6 elements long.
  const [pastGuesses, setPastGuesses] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Stores the current guess (the guess that is currently being typed).
  const [currentGuess, setCurrentGuess] = useState<string>("");

  // Stores the index of the row that is currently being guessed.
  // Invariant: This variable should always be between 0 and 5.
  const [activeRow, setActiveRow] = useState<number>(0);

  /**
   * Load the target word from an external API.
   *
   * As noted in the assignment reading, you can use the following
   * API call to get a random 5-letter word:
   * GET https://comp426-apis.vercel.app/api/wordle/random-word
   *
   * This API call returns a JSON object with the following format:
   * { word: "<word here>" }
   *
   * Remember that loading data from an API is consider a *side effect*.
   * Therefore, you will need to use the `useEffect` hook.
   */

  useEffect(() => {
    // Declare the async function inside the effect
    async function fetchTargetWord(): Promise<void> {
      await fetch("https://comp426-apis.vercel.app/api/wordle/random-word")
        .then((response) => response.json())
        .then((data) => {
            setTargetWord(data.word!);
        });
    };

    fetchTargetWord(); // Invoke it immediately
  }, []);
  
  

  /**
   * EXTRA CREDIT: In the real Wordle game, you can type on your keyboard to
   * type characters. As noted in the assignment reading, you can add keyboard
   * support to Wordle using traditional event handlers. Remember that adding
   * event handler is considered a *side effect*.
   *
   * Make sure that you use React's features to clean up the event handler when
   * the component is unmounted.
   *
   * Check out this documentation for more information:
   * https://react.dev/learn/removing-effect-dependencies
   *
   * HINT: You can add event handlers to the `window` to apply a global event handler!
   */

  useEffect(() => {
    let handleKeyUp = (event) => {
      //console.log("within handler for key up: " + event.key.toUpperCase());
      if (event.key === "Enter") {
        makeGuess();
      } else if (event.key === "Backspace") {
        onBackspace();
      } else {
        onKeyPress(event.key.toUpperCase());
      }
    }
    
    //document.addEventListener("keyup", handleKeyUp);
    document.onkeyup = handleKeyUp;

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    }
  });

  /**
   * The <Keyboard> requires a handler for when a letter is pressed.
   * This is required so that the keyboard can update the current guess.
   *
   * Implement this function to update the current guess with `letter`.
   *
   * Add validation to ensure that the current guess is at most 5 letters long.
   *
   * @param letter The letter that was pressed.
   */
  const onKeyPress = (letter: string) => {
    // console.log("on key press: " + letter);
    // console.log("currentGuess.length: " + currentGuess.length);
    if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess => currentGuess + letter);
    }
    //console.log("currentGuess: " + currentGuess);
  };

  /**
   * The <Keyboard> requires a handler for when the backspace key is pressed.
   * This is required so that the keyboard can backspace the current guess.
   *
   * Implement this function.
   *
   * Add validation to ensure that nothing happens when the current guess is already empty.
   */
  const onBackspace = () => {
    if (currentGuess.length > 0) {
      setCurrentGuess(currentGuess.substring(0, currentGuess.length - 1));
    }
  };

  /**
   * We need to ensure that guesses that the user makes are valid five letter words.
   * For example, we would not want the user to be able to guess `ASDFG`. The real
   * Wordle also handles this validation.
   *
   * As noted in the assignment reading, you can use the following  API call to
   * ensure that a guess is valid:
   * GET https://comp426-apis.vercel.app/api/wordle/word-validator/[word]
   * (replace `[word]` with the word to check)
   *
   * This API call returns a JSON object with the following format:
   * { valid: <true or false> }
   *
   * @param guess The guess to check.
   * @returns true if the guess is valid, false otherwise.
   */
  const checkGuessValidity = async (guess: string) => {
    let isValid: boolean = false;
    await fetch("https://comp426-apis.vercel.app/api/wordle/word-validator/" + currentGuess)
      .then((response) => response.json())
      .then((data) => {
          isValid = data.valid!;
      });
    return isValid;
  };

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

  /**
   * The main functionality for this component is to handle when the user
   * submits guess. This happens when the user presses the "Enter" key. This
   * function must do the following things:
   *
   * 1. If the current guess is less than five characters, show an toast on the
   *    screen that says "Please enter a 5-letter word". You can use `showToast()`
   *    to do this (read above).
   *
   * 2. If the current guess is not a valid word, show a toast on the screen
   *    that says "This is not a valid word.".
   *
   * 3. If the current guess is valid, update the entry for the active row in the
   *    list of past guesses to include the new guess. Clear our the current
   *    guess and increment the active row.
   *
   * 4. If the active row is greater than or equal to 5, end the game by updating the
   *    game status to 'lost' after a 2000ms delay.
   *
   * 5. If the current guess is equal to the target word, end the game by updating the
   *   game status to 'won' after a 2000ms delay.
   */
  const makeGuess = async () => {
    if (currentGuess.length < 5) {
      showToast("Please enter a 5-letter word!");
      return;
    }

    if (currentGuess === targetWord) {
      setTimeout(() => {setGameStatus("won")}, 2000);
      return; 
    }

    let isValid = await checkGuessValidity(currentGuess);
    if (!isValid) {
      showToast("This is not a valid word!");
      return;
    } else {
      let updatedPastGuesses: string[];
      updatedPastGuesses = [...pastGuesses.slice(0, activeRow), 
        currentGuess, 
        ...pastGuesses.slice(activeRow + 1)]
      setPastGuesses(updatedPastGuesses);
      setCurrentGuess("");
      setActiveRow(activeRow + 1);
    }

    // console.log("pastGuesses: " + pastGuesses);
    // console.log("currentGuess: " + currentGuess);
    // console.log("activeRow: " + activeRow);

    if (activeRow >= 5) {
      setTimeout(() => {setGameStatus("lost")}, 2000);
      return; 
    }

  };
  

  return (
    <div className="flex h-svh max-h-svh w-full flex-col items-center overflow-hidden">
      <Header />
      {gameOver && (
        <WordleResults
          status={gameStatus}
          pastGuesses={pastGuesses}
          targetWord={targetWord}
        />
      )}
      {!gameOver && (
        <div className="flex w-full flex-1 flex-col items-center justify-evenly gap-3">
          <div className="flex flex-col gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <TileRow
                key={i}
                target={targetWord}
                guess={activeRow === i ? currentGuess : pastGuesses[i]}
                guessed={activeRow > i}
              />
            ))}
          </div>
          <div>
            <Keyboard
              target={targetWord}
              guesses={pastGuesses}
              onKeyPress={onKeyPress}
              onEnter={makeGuess}
              onBackspace={onBackspace}
            />
          </div>
        </div>
      )}
      <Toast isVisible={isVisible} message={message} />
    </div>
  );
}
