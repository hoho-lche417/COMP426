/**
 * DO NOT MODIFY
 * Entry point for the Wordle game.
 */

import { createRoot } from "react-dom/client";
import WordlePage from "./WordlePage";

const root = createRoot(document.getElementById("root")!);
root.render(<WordlePage />);
