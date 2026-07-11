/**
 * This file specifies the component for a single tile on the Wordle game grid.
 *
 * You will be implementing this component from scratch. You will also be styling
 * the component using Tailwind CSS based on the provided specifications.
 *
 * First, note the `TileState` enum below:
 */

import { CopyMinus } from "lucide-react";
import { cn } from "../utils/cn";

export enum TileState {
  Default, // This tile is either empty or contains a letter that has not been guessed yet (white background)
  Incorrect, // This tile contains a letter that is not in the word (dark grey)
  PartiallyCorrect, // This tile contains a letter that is in the word but in the wrong placement (yellow)
  Correct, // This tile contains a letter in the correct placement (green)
}

/**
 * This enum specifies the possible states of the tile. The state of the tile will be
 * provided into the component as a prop. In addition, if a letter is typed in the tile,
 * it will be provided as a prop as well. The base component is listed below.
 *
 * Make the tile component as a div. It should contain the following styles:
 * 1. The tile should be a square with a width and height of 3.5rem (56px).
 * 2. The tile should have a border of 2px.
 * 3. The tile should be a flexbox.
 * 4. The text inside of the tile should be centered both horizontally and vertically.
 * 5. The text inside of the tile should be Tailwind size 2xl and bold.
 * 6. The text inside of the tile should not be selectable!
 *    (Hint: https://tailwindcss.com/docs/user-select)
 *
 * Finally, the rest of the styles should depend on the state of the tile and the letter:
 * - If the tile is in the `Default` state:
 *      - If the tile contains a letter, the text should be black and the border color
 *        should be Tailwind's `gray-500` color.
 *      - If the tile does not contain a letter, the text should be black and the border
 *        color should be Tailwind's gray-300 color.
 * - If the tile is in the `Incorrect` state, the text should be white and the border
 *   color and background color should be Tailwind's gray-500 color.
 * - If the tile is in the `PartiallyCorrect` state, the text should be white and the
 *  border color and background color should be the custom `wordle-yellow` Tailwind color.
 * - If the tile is in the `Correct` state, the text should be white and the border
 *  color and background color should be the custom `wordle-green` Tailwind color.
 *
 * Finish the component below.
 */

type TileProps = { letter: string | null; state: TileState };

export default function Tile({ letter, state }: TileProps) {
  //console.log(letter + " with " + state);
  let moreStyle: string = ""; // additional css style based on the tile state

  if (state === TileState.Correct) {
    moreStyle = "text-white border-wordle-green bg-wordle-green";
  } else if (state == TileState.PartiallyCorrect) {
    moreStyle = "text-white border-wordle-yellow bg-wordle-yellow";
  } else if (state == TileState.Incorrect) {
    moreStyle = "text-white border-gray-500 bg-gray-500";
  } else if (state == TileState.Default) {
    moreStyle = "text-black border-gray-" + (letter !== null? "500" : "300");
  }

  return (
    <div 
      className={cn(
        "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold select-none",
        moreStyle,
      )}
    >{letter}
    </div>
  );
}
