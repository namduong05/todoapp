export type Task = {
  _id: string;
  title: string;
  status: string;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt?: Date;
};
