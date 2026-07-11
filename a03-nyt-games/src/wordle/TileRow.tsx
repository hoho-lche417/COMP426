/**
 * DO NOT MODIFY
 *
 * This file contains the functionality for a tile row. This will include five tiles and also
 * handle determining the state for each tile in the row.
 */

import Tile, { TileState } from "./Tile";

type TileRowProps = {
  target: string;
  guess: string;
  guessed: boolean;
};

export default function TileRow({ target, guess, guessed }: TileRowProps) {
  return (
    <div className="flex w-full flex-row gap-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <Tile
          key={i}
          letter={i < guess.length ? guess[i] : null}
          state={
            guessed ? stateForTile(target, guess[i], i) : TileState.Default
          }
        />
      ))}
    </div>
  );
}

function stateForTile(target: string, letter: string, letterPosition: number) {
  // letter position: 0-4
  // Determine if a tile is correct, partially correct, or incorrect based on the current guess and the target word
  if (target.includes(letter)) {
    if (target[letterPosition] === letter) {
      return TileState.Correct;
    } else {
      return TileState.PartiallyCorrect;
    }
  } else {
    return TileState.Incorrect;
  }
}
