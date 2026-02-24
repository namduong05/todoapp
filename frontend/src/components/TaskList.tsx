import type { Task } from "@/type";
import TaskCard from "./TaskCard";
import TaskEmptyState from "./TaskEmptyState";

const TaskList = () => {
  const filter = "all";
  const filteredTasks: Task[] | [] = [
    {
      _id: "1",
      title: "Học React",
      status: "active",
      completedAt: null,
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Học NodeJS",
      status: "complete",
      completedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskCard key={task._id ?? index} task={task} index={index} />
      ))}
    </div>
  );
};

export default TaskList;
