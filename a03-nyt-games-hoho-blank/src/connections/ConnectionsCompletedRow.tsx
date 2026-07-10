/**
 * DO NOT MODIFY:
 * Component showing a completed row in Connections.
 */

import { cn } from "../utils/cn";
import { ConnectionsGameAnswer, twConnectionColor } from "./types";

type ConnectionsCompletedRowProps = {
  answer: ConnectionsGameAnswer;
};

export default function ConnectionsCompletedRow({
  answer,
}: ConnectionsCompletedRowProps) {
  return (
    <div
      className={cn(
        "col-span-4 flex h-20 flex-col items-center justify-center rounded-lg",
        twConnectionColor(answer.color),
      )}
    >
      <p className="font-nyt-body font-semibold uppercase">{answer.category}</p>
      <p className="font-nyt-body uppercase">{answer.correct.join(", ")}</p>
    </div>
  );
}
