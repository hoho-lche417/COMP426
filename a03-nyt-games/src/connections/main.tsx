/**
 * DO NOT MODIFY
 * Main entrypoint for the Connections game React page.
 */
import { createRoot } from "react-dom/client";
import ConnectionsPage from "./ConnectionsPage";

const root = createRoot(document.getElementById("root")!);
root.render(<ConnectionsPage />);
