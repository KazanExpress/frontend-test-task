<template>
  <div v-draggable="{ task: task, name: 'task' }" class="task">
    <div class="task__header">
      Задача № {{ task.id }} -
      <span v-text="finish ? 'Задача выполнена' : 'Ждет выполнения'"></span>
    </div>
    <div class="task__content">
      <div class="task__box-title">
        <h3 class="task__title">{{ task.name }}</h3>
        <button
          class="btn"
          @click="
            SET_TASK_DATA({ id: task.id });
            OPEN_MODAL({ active: true, name: 'taskTitleModal' });
          "
        >
          Изменить
        </button>
      </div>
      <p class="task__desc">{{ task.desc }}</p>
    </div>
    <div class="task__controls">
      <button
        class="btn"
        @click="
          SET_TASK_DATA({ id: task.id });
          OPEN_MODAL({ active: true, name: 'subTaskModal' });
        "
      >
        Создать задачу
      </button>
      <button
        class="task__btn-delete btn"
        @click="
          SET_TASK_DATA({ id: task.id });
          DELETE_TASK();
        "
      >
        Удалить задачу
      </button>
      <my-checkbox v-model="finish">Задача выполнена</my-checkbox>
    </div>
    <task-item
      v-for="subTask in task.subTasks"
      :key="subTask.id"
      :task="subTask"
      class="task__subtask"
    />
  </div>
</template> 

<script  lang="ts">
import { defineComponent } from 'vue';
import MyCheckbox from './UI/MyCheckbox.vue';
import { mapMutations } from 'vuex';
import { Task } from '../store';
export default defineComponent({
  components: { MyCheckbox },
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
  data() {
    return {
      finish: this.task.finish as boolean,
    };
  },
  watch: {
    finish(): void {
      this.SET_TASK_DATA({ id: this.task.id, finish: this.finish });
      this.FINISH_TASK();
    },
  },
  methods: {
    ...mapMutations([
      'SET_TASK_DATA',
      'FINISH_TASK',
      'DELETE_TASK',
      'OPEN_MODAL',
    ]),
  },
});
</script>

<style scoped lang="scss">
.task {
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.1);
  &__header {
    padding-bottom: 20px;
    border-bottom: 1px solid #323232;
  }
  &__content {
    margin-top: 20px;
  }
  &__box-title {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  &__controls {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #323232;
  }
  &__btn-delete {
    background: #dc3545;
  }
  &__subtask {
    margin-top: 20px;
    box-shadow: none;
    border: 1px solid #323232;
  }
}

.dragging {
  opacity: 0.5;
}
</style>