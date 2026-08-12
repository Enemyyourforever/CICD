import { useTaskStore } from '../store/task';

export const useCurrentTask = (id: number) => {
  const taskStore = useTaskStore();
  const task = taskStore.tasks.find(t => t.id === id);
  return {
    task,
  };
};
