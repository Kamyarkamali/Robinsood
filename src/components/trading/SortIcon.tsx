import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import type { SortIconProps } from "../../types/interfaces";

export function SortIcon({ col, sortCol, sortDir }: SortIconProps) {
  if (sortCol !== col)
    return <ChevronsUpDown size={12} className="text-gray-500" />;
  return sortDir === "asc" ? (
    <ChevronUp size={12} className="text-emerald-400" />
  ) : (
    <ChevronDown size={12} className="text-emerald-400" />
  );
}
