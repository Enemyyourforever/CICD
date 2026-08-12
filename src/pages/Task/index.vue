<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useCurrentTask } from '../../composable/useCurrentTask';
const route = useRoute();
const taskId = Number(route.params.id);

const { task } = useCurrentTask(taskId);
</script>
<template>
  {{ task }}
</template>
