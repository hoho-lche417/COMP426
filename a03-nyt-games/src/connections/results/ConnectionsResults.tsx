/**
 * DO NOT MODIFY:
 * Component showing the results page for Connections.
 */

import ConnectionsButton from "../../ui/ConnectionsButton";
import { GameStatus, ConnectionsColor, ConnectionsGameAnswer } from "../types";
import ConnectionsResultsTile from "./ConnectionsResultsTile";
import { useToast } from "../../hooks/useToast";
import Toast from "../../ui/Toast";

type ConnectionsResultsProps = {
  status: GameStatus;
  guesses: Set<string>[];
  answers: ConnectionsGameAnswer[];
};

export default function ConnectionsResults({
  status,
  guesses,
  answers,
}: ConnectionsResultsProps) {
  const { showToast, isVisible, message } = useToast();

  const shareResults = () => {
    // Create emoji representation of the results
    const emojiMap: Record<ConnectionsColor, string> = {
      yellow: "🟨",
      green: "🟩",
      blue: "🟦",
      purple: "🟪",
    };

    // Generate the emoji grid
    const emojiRows = guesses.map((guess) =>
      Array.from(guess)
        .map((item) => emojiMap[getTileColor(item)])
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

  // Function to determine the color of a tile based on which group it belongs to
  const getTileColor = (item: string): ConnectionsColor => {
    for (const answer of answers) {
      if (answer.correct.includes(item)) {
        return answer.color;
      }
    }
    return "yellow"; // fallback
  };

  // Create a flat array of all tiles in order of guesses
  const allTiles = guesses.flatMap((guess) => Array.from(guess));

  return (
    <div className="my-3 flex flex-col gap-3">
      <p className="font-nyt-heading text-2xl font-bold">
        {status === "won" && "Congratulations!"}
        {status === "lost" && "Next Time!"}
      </p>
      <div className="mx-auto my-4 grid w-fit grid-cols-4 gap-1">
        {allTiles.map((item, index) => (
          <ConnectionsResultsTile
            key={`${item}-${index}`}
            color={getTileColor(item)}
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
