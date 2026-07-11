/** DO NOT MODIFY:
 * Component showing the mistakes counter for the Connections game.
 */

type ConnectionsMistakesCounterProps = {
  mistakesRemaining: number;
};

export default function ConnectionsMistakesCounter({
  mistakesRemaining,
}: ConnectionsMistakesCounterProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <p className="font-nyt-body text-sm font-light text-gray-600">
        Mistakes Remaining:
      </p>
      {[...Array(mistakesRemaining)].map((i) => (
        <span
          key={i}
          className="bg-connections-selected-tile size-4 rounded-full"
        ></span>
      ))}
    </div>
  );
}
