<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../../store/task';
// const inputRef = ref<HTMLInputElement | null>(null)
const inputText = ref('');
const taskStore = useTaskStore();
</script>
<template>
  <div class="todo-wrapper">
    <!-- 头部输入区域 -->
    <div class="input-area">
      <input v-model="inputText" type="text" placeholder="请输入待办事项" />
      <button
        class="add-btn"
        @click="
          taskStore.handleAdd(inputText);
          inputText = '';
        "
      >
        添加
      </button>
    </div>

    <!-- 列表区域 -->
    <div class="task-list">
      <div v-for="(task, index) in taskStore.tasks" :key="index" class="task-item">
        <!-- 给 ID 和名称加上样式，并加个符号分隔 -->
        <div class="task-content">
          <router-link :to="{ name: 'task', params: { id: task.id } }">
            <span class="task-id">#{{ task.id }}</span>
            <span class="task-name">{{ task.name }}</span>
          </router-link>
        </div>
        <button class="delete-btn" @click="taskStore.handleDelete(index)">删除</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 外层容器，模拟卡片效果 */
.todo-wrapper {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 输入区域排版 */
.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input-area input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: none;
}

.input-area input:focus {
  border-color: #409eff;
}

.add-btn {
  padding: 8px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.add-btn:hover {
  opacity: 0.8;
}

/* 列表单项排版 */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 每个待办事项之间的间距 */
}

.task-item {
  display: flex;
  justify-content: space-between; /* 左右两端对齐 */
  align-items: center; /* 垂直居中对齐 */
  padding: 10px 12px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 8px; /* ID和任务名称之间的间距 */
}

.task-id {
  color: #888;
  font-size: 0.9em;
  font-weight: bold;
}

.task-name {
  color: #333;
}

/* 删除按钮美化 */
.delete-btn {
  padding: 4px 12px;
  border: 1px solid #ff4d4f;
  color: #ff4d4f;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-btn:hover {
  background-color: #ff4d4f;
  color: white;
}
</style>
