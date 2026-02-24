import { Circle } from "lucide-react";
import { Card } from "./ui/card";

const TaskEmptyState = ({ filter }: { filter: string }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="size-12 mx-auto text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "Không có nhiệm vụ nào đang làm."
              : filter === "cpmplete"
                ? "Chưa có nhiệm vụ nào hoàn thành."
                : "Chưa có nhiệm vụ."}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter == "all"
              ? "Thêm vào nhiệm vụ đầu tiên để bắt đầu!"
              : `Chuyển sang "tất cả" để thấy những nhiệm vụ ${filter === "active" ? "đã hoàn thành." : "đang làm."}`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
