/**
 * DO NOT MODIFY:
 * Component showing a tile in the results graphic for Connections.
 */

import { cn } from "../../utils/cn";
import { ConnectionsColor, twConnectionColor } from "../types";

type ConnectionsResultsTileProps = {
  color: ConnectionsColor;
};
export default function ConnectionsResultsTile({
  color,
}: ConnectionsResultsTileProps) {
  return <div className={cn("size-5 rounded", twConnectionColor(color))}></div>;
}
