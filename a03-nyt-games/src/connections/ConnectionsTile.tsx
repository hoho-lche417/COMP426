/**
 * DO NOT MODIFY:
 * Component showing a tile to guess in Connections.
 */

import { cn } from "../utils/cn";
import { useShake } from "../hooks/useShake";

type ConnectionsTileProps = {
  selected: boolean;
  option: string;
  onClick: () => void;
  shouldShake?: boolean;
};
export default function ConnectionsTile({
  selected,
  option,
  onClick,
  shouldShake = false,
}: ConnectionsTileProps) {
  const { isShaking, animationKey } = useShake(shouldShake);
  return (
    <div
      key={`shake-${animationKey}`}
      className={cn(
        "flex h-20 w-20 items-center justify-center rounded-lg hover:cursor-pointer md:w-auto",
        selected
          ? "bg-connections-selected-tile text-white"
          : "bg-connections-default-tile",
        isShaking && "animate-shake",
      )}
      onClick={onClick}
    >
      <p className="font-nyt-body text-center text-xs leading-tight font-semibold break-words hyphens-auto uppercase sm:text-sm md:text-base">
        {option}
      </p>
    </div>
  );
}
