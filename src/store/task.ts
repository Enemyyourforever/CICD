import { defineStore } from 'pinia';
import { ref } from 'vue';
interface Task {
  name: string;
  id: number;
}
console.log('testPushAgain');

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([]);
  const handleAdd = (taskName: string) => {
    console.log(taskName);
    console.error('testError');

    if (!taskName) return;
    tasks.value.push({
      id: tasks.value.length,
      name: 'task:' + taskName,
    });
  };
  const handleDelete = (index: number) => {
    tasks.value.splice(index, 1);
  };
  return {
    tasks,
    handleAdd,
    handleDelete,
  };
});
