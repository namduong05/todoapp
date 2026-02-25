import type { Task } from "@/type";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";

const TaskCard = ({
  task,
  index,
  handleTaskChanged,
}: {
  task: Task;
  index: number;
  handleTaskChanged: () => void;
}) => {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState<string>(
    task.title || "",
  );

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Đã xóa nhiệm vụ.");
      handleTaskChanged();
    } catch (error) {
      console.error("Loi khi xoa nhiem vu.");
      toast.error("Loi khi xoa nhiem vu");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      console.log("Cập nhật task thành công!");
      toast.success("Cập nhật task thành công!");
      handleTaskChanged();
    } catch (error) {
      console.log("Có lỗi khi cập nhật task!", error);
      toast.success("Có lỗi khi cập nhật task!");
    }
  };

  const toggleTaskComplete = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "complete",
          completedAt: new Date().toISOString(),
        });

        toast.success(`Nhiệm vụ ${task.title} đã hoàn thành!`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });

        toast.success(`Nhiệm vụ ${task.title} chuyển thành đang làm!`);
      }

      handleTaskChanged();
    } catch (error) {
      console.log("Có lỗi khi cập nhật trạng thái task!", error);
      toast.success("Có lỗi khi cập nhật trạng thái task!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* Nút */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}
          onClick={toggleTaskComplete}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        {/* Tiêu đề */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="Cần làm gì?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/50"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}
          {/* Ngày */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Nút chỉnh và xóa */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* Edit */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* Delete */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
