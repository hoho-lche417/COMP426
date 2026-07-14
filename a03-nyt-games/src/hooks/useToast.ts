import { useState, useCallback, useRef } from "react";

/**
 * DO NOT MODIFY
 * Custom hook that shows and manages toasts on the application.
 */
export function useToast(duration: number = 3000) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const timeoutRef = useRef<number | null>(null);

  const showToast = useCallback(
    (toastMessage: string) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setMessage(toastMessage);
      setIsVisible(true);

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        timeoutRef.current = null;
      }, duration);
    },
    [duration],
  );

  const hideToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  return { showToast, hideToast, isVisible, message };
}
