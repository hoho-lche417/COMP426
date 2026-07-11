/**
 * DO NOT MODIFY
 * Component representing buttons used in the Connections UI.
 */

import { cn } from "../utils/cn";

type ConnectionsButtonProps = {
  label: string;
  enabled?: boolean;
  onClick: () => void;
};
export default function ConnectionsButton({
  label,
  enabled = true,
  onClick,
}: ConnectionsButtonProps) {
  return (
    <div
      className={cn(
        "flex h-12 min-w-fit flex-row rounded-full border p-3 select-none",
        enabled
          ? "border-gray-700 hover:cursor-pointer"
          : "border-gray-300 text-gray-400",
      )}
      onClick={() => {
        if (enabled) {
          onClick();
        }
      }}
    >
      <p className="font-nyt-body">{label}</p>
    </div>
  );
}
