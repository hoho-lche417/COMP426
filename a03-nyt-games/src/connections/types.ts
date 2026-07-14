/**
 * DO NOT MODIFY
 * Helpers and types used by the Connections game.
 */

export type GameStatus = "playing" | "won" | "lost";

export type ConnectionsColor = "yellow" | "green" | "blue" | "purple";

export type ConnectionsGameAnswer = {
  color: ConnectionsColor;
  category: string;
  correct: string[];
};

export type ConnectionsGameResponse = {
  id: number;
  options: string[];
  answers: ConnectionsGameAnswer[];
};

export const twConnectionColor = (color: ConnectionsColor): string => {
  switch (color) {
    case "yellow":
      return "bg-connections-yellow";
    case "green":
      return "bg-connections-green";
    case "blue":
      return "bg-connections-blue";
    case "purple":
      return "bg-connections-purple";
  }
};
