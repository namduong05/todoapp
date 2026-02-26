import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import PaginationTaskList from "@/components/PaginationTaskList";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import type { Task } from "@/type";
import { toast } from "sonner";
import api from "@/lib/axios";
import { options, visibleTaskLimit, type DateFilter } from "@/lib/data";

type Test = {
  tasks: Task[];
  activeCount: number;
  completeCount: number;
};

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState<Task[] | null>(null);
  const [activeTasksCount, setActiveTasksCount] = useState<number>(0);
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
  const [filter, setFilter] = useState<string>("all");
  const [dateQuery, setDateQuery] = useState<DateFilter>(options[0]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [dateQuery, filter]);

  const fetchTasks = async () => {
    try {
      const res = await api.get<Test>(`/tasks?filter=${dateQuery.value}`);
      setTaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompletedTasksCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu nhiệm vụ", error);
      toast.error("Lỗi khi lấy dữ liệu nhiệm vụ");
    }
  };

  let filteredTasks;
  let visibleTasks = null;
  let totalPages: number = 0;
  if (taskBuffer) {
    filteredTasks = taskBuffer.filter((task) => {
      switch (filter) {
        case "active":
          return task.status === "active";
        case "completed":
          return task.status === "complete";
        default:
          return true;
      }
    });

    visibleTasks = filteredTasks.slice(
      (page - 1) * visibleTaskLimit,
      page * visibleTaskLimit,
    );

    totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (visibleTasks?.length === 0) {
    handlePrevPage();
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Dual Gradient Overlay Swapped Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 20%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 80% 80%, rgba(59,130,246,0.3), transparent)
      `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu trang */}
          <Header />
          {/* Tạo nhiệm vụ */}
          <AddTask handleTaskAdded={handleTaskChanged} />
          {/* Thông kê và bộ lọc */}
          <StatsAndFilters
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
            filter={filter}
            setFilter={setFilter}
          />
          {/* Danh sách nhiệm vụ */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />
          {/* Phân trang và lọc theo ngày */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <PaginationTaskList
              handleNext={handleNextPage}
              handlePrev={handlePrevPage}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>
          {/* Chân trang */}
          <Footer
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
