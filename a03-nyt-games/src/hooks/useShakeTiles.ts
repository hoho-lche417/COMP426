import { useState, useCallback } from "react";

/**
 * DO NOT MODIFY
 * This is a custom hook that is used to trigger a shaking animation for a set of tiles.
 */
export function useShakeTiles(duration: number = 700) {
  const [tilesToShake, setTilesToShake] = useState<Set<string>>(new Set());

  const shouldShake = useCallback(
    (option: string) => {
      return tilesToShake.has(option);
    },
    [tilesToShake]
  );

  const shakeTiles = useCallback(
    (tilesToShakeArray: string[]) => {
      setTilesToShake(new Set(tilesToShakeArray));
      setTimeout(() => setTilesToShake(new Set()), duration);
    },
    [duration]
  );

  return { shouldShake, shakeTiles };
}
