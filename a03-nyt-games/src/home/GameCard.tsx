/**
 * DO NOT MODIFY:
 * Component showing a game on the home page.
 */

import { cn } from "../utils/cn";

export type GameType = "wordle" | "connections";

type GameDetails = {
  color: string;
  icon: string;
  name: string;
  url: string;
};

const wordleDetails: GameDetails = {
  color: "bg-wordle",
  icon: "/icons/wordle.png",
  name: "Wordle",
  url: "/wordle",
};

const connectionsDetails: GameDetails = {
  color: "bg-connections",
  icon: "/icons/connections.png",
  name: "Connections",
  url: "/connections",
};

export default function GameCard({ game }: { game: GameType }) {
  const details = game === "wordle" ? wordleDetails : connectionsDetails;

  return (
    <div className="flex h-60 w-full flex-col rounded-xl border border-gray-300 md:w-64">
      <div
        className={cn(
          "bg-connections flex h-3/4 flex-col items-center justify-center gap-2 rounded-t-xl",
          details.color,
        )}
      >
        <img className="size-16" src={details.icon} />
        <p className="font-nyt-heading text-xl font-bold">{details.name}</p>
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-center p-5">
        <a
          className="font-nyt-body w-full rounded-full border border-gray-300 p-1 text-center font-medium hover:cursor-pointer hover:bg-gray-50"
          href={details.url}
        >
          Play
        </a>
      </div>
    </div>
  );
}
