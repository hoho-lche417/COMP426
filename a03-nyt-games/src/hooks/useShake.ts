import { useState, useEffect } from "react";

/**
 * DO NOT MODIFY
 * This is a custom hook that is used to manage an individual shaking animation.
 */
export function useShake(shouldShake: boolean, duration: number = 700) {
  const [isShaking, setIsShaking] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (shouldShake) {
      // Force animation restart by incrementing key
      setAnimationKey((prev) => prev + 1);
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), duration);
      return () => clearTimeout(timer);
    }
  }, [shouldShake, duration]);

  return { isShaking, animationKey };
}
