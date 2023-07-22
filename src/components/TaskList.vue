<template>
  <div class="app__list" @dragover="onDragOver" @drop="onDrop">
    <transition-group name="task-list">
      <task-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :data-task-id="task.id"
        class="app__item"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskItem from './TaskItem.vue';
import { mapMutations } from 'vuex';
import { Task } from '../store';
export default defineComponent({
  components: { TaskItem },
  props: {
    tasks: {
      type: Array as () => Task[],
      required: true,
    },
  },
  methods: {
    ...mapMutations(['DROP_TASK']),
    onDragOver(event: Event): void {
      event.preventDefault();
    },
    onDrop(event: DragEvent): void {
      event.preventDefault();
      const taskData = JSON.parse(event.dataTransfer!.getData('task')) as Task;
      const targetElement = (event.target as HTMLElement).closest('.app__item');

      let targetId: null | number = null;
      if (targetElement) {
        targetId = +targetElement.getAttribute('data-task-id')!;
      }
      this.DROP_TASK({ taskData: taskData, targetId });
    },
  },
});
</script>

<style scoped lang="scss">
.app__list {
  min-height: 300px;
}
.task-list-item {
  display: inline-block;
  margin-right: 10px;
}
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}
.task-list-enter-from {
  transform: translateX(-50px);
}
.task-list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
.task-list-move {
  transition: transform 1s ease;
}
</style>