export const filters = {
  all: "Tất cả",
  active: "Đang làm",
  completed: "Hoàn thành",
} as {
  all: string;
  active: string;
  completed: string;
};

export type DateFilter = {
  value: string;
  label: string;
};

export const options: DateFilter[] = [
  {
    value: "today",
    label: "Hôm nay",
  },
  {
    value: "week",
    label: "Tuần này",
  },
  {
    value: "month",
    label: "Tháng này",
  },
  {
    value: "all",
    label: "Tất cả",
  },
];

export const visibleTaskLimit = 4;
