import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleTaskAdded }: { handleTaskAdded: () => void }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm vào!`);
        handleTaskAdded();
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm task.", error);
        toast.error("Lỗi xảy ra khi thêm task.");
      }

      setNewTaskTitle("");
    } else {
      toast.info("Bạn cần nhập nội dung nhiệm vụ.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div>
      <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="text"
            placeholder="Cần làm gì?"
            className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/50"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="gradient"
            size="xl"
            className="px-6"
            onClick={addTask}
            disabled={!newTaskTitle.trim()}
          >
            {" "}
            <Plus className="size-5" /> Thêm
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddTask;
