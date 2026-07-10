/**
 * Home page of the application.
 */

import Header from "../ui/Header";
import GameCard from "./GameCard";

export default function HomePage() {
  /**
   * TODO:
   * Change the name of `Partner 1` and `Partner 2` to your names!
   */
  return (
    <div className="flex h-svh max-h-svh w-full flex-col items-center overflow-hidden">
      <Header />
      <div className="flex w-full flex-1 flex-col gap-6 px-12 py-8 md:flex-row md:justify-center">
        <GameCard game="wordle" />
        <GameCard game="connections" />
      </div>
      <p className="h-14 px-4 text-center text-xs text-gray-600">
        Made with 🩵 by{" "}
        <a className="underline underline-offset-2 hover:cursor-pointer">
          Partner 1
        </a>{" "}
        and{" "}
        <a className="underline underline-offset-2 hover:cursor-pointer">
          Partner 2
        </a>{" "}
        for COMP 426 @ UNC-Chapel Hill
      </p>
    </div>
  );
}
