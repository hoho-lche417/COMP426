/**
 * DO NOT MODIFY
 * Component for the toast stlying.
 */

import { cn } from "../utils/cn";

type ToastProps = {
  isVisible: boolean;
  message: string;
};

export default function Toast({ isVisible, message }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform">
      <div
        className={cn(
          "bg-connections-selected-tile rounded-lg px-6 py-3 text-white shadow-lg",
          "font-nyt-body font-medium",
          "animate-in slide-in-from-bottom-2 duration-300",
        )}
      >
        {message}
      </div>
    </div>
  );
}
