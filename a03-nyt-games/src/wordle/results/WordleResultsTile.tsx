/**
 * DO NOT MODIFY:
 * Component showing a tile in the results graphic for Wordle.
 */

import { cn } from "../../utils/cn";

type WordleResultsTileProps = {
  state: "correct" | "partially-correct" | "incorrect";
};

export default function WordleResultsTile({ state }: WordleResultsTileProps) {
  const twColor = () => {
    switch (state) {
      case "correct":
        return "bg-wordle-green text-white";
      case "partially-correct":
        return "bg-wordle-yellow text-white";
      case "incorrect":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div
      className={cn(
        "flex size-5 items-center justify-center rounded text-xs font-bold",
        twColor(),
      )}
    />
  );
}
