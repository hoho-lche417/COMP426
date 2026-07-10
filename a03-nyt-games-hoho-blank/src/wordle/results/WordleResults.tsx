/**
 * DO NOT MODIFY:
 * Component showing the results page for Wordle.
 */

import ConnectionsButton from "../../ui/ConnectionsButton";
import { GameStatus } from "../../connections/types";
import WordleResultsTile from "./WordleResultsTile";
import { useToast } from "../../hooks/useToast";
import Toast from "../../ui/Toast";

type WordleResultsProps = {
  status: GameStatus;
  pastGuesses: string[];
  targetWord: string;
};

export default function WordleResults({
  status,
  pastGuesses,
  targetWord,
}: WordleResultsProps) {
  const { showToast, isVisible, message } = useToast();

  // Function to determine the state of each letter in a guess
  const getLetterState = (
    letter: string,
    index: number,
  ): "correct" | "partially-correct" | "incorrect" => {
    if (targetWord[index] === letter) {
      return "correct";
    } else if (targetWord.includes(letter)) {
      return "partially-correct";
    } else {
      return "incorrect";
    }
  };

  const shareResults = () => {
    // Create emoji representation of the results
    const emojiMap = {
      correct: "🟩",
      "partially-correct": "🟨",
      incorrect: "⬛",
    };

    // Generate the emoji grid
    const emojiRows = pastGuesses
      .filter((guess) => guess.length === 5) // Only include completed guesses
      .map((guess) =>
        guess
          .split("")
          .map((letter, index) => emojiMap[getLetterState(letter, index)])
          .join(""),
      );

    const emojiText = emojiRows.join("\n");

    // Copy to clipboard
    navigator.clipboard
      .writeText(emojiText)
      .then(() => {
        showToast("Results copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy to clipboard:", err);
        showToast("Failed to copy results");
      });
  };

  // Create a flat array of all tiles in order of guesses
  const allTiles = pastGuesses
    .filter((guess) => guess.length === 5) // Only include completed guesses
    .flatMap((guess) =>
      guess.split("").map((letter, index) => ({
        letter,
        state: getLetterState(letter, index),
      })),
    );

  return (
    <div className="my-3 flex flex-col gap-3">
      <p className="font-nyt-heading text-2xl font-bold">
        {status === "won" && "Congratulations!"}
        {status === "lost" && "Next Time!"}
      </p>
      <div className="mx-auto my-4 grid w-fit grid-cols-5 gap-1">
        {allTiles.map((tile, index) => (
          <WordleResultsTile
            key={`${tile.letter}-${index}`}
            state={tile.state}
          />
        ))}
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <ConnectionsButton label="Share Results" onClick={shareResults} />
        <a
          href="/"
          className="text-sm underline underline-offset-2 hover:cursor-pointer"
        >
          View all games
        </a>
      </div>
      <Toast isVisible={isVisible} message={message} />
    </div>
  );
}
