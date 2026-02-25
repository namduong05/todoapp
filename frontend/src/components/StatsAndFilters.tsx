import { filters } from "@/lib/data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const StatsAndFilters = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter,
  setFilter,
}: {
  completedTasksCount: number;
  activeTasksCount: number;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      {/* Thống kê */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {filters.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20"
        >
          {completedTasksCount} {filters.completed}
        </Badge>
      </div>
      {/* Filter */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.keys(filters).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size="sm"
            className="capitalize"
            onClick={() => setFilter(type)}
          >
            <Filter className="size-4" />
            {type === "all"
              ? filters.all
              : type === "active"
                ? filters.active
                : filters.completed}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;
