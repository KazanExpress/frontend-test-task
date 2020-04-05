<template>
    <form @submit.prevent="addItemTaskHandler">
        <div class="form-group">
            <label for="task_name">Task name</label>
            <input v-model="task.name" type="text" class="form-control" id="task_name" placeholder="Please enter task name" required>
        </div>
        <div class="form-group">
            <label for="task_description">Description</label>
            <input v-model="task.description" type="text" class="form-control" id="task_description" placeholder="Please enter description for task" required>
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Add Task</button>
    </form>
</template>

<script lang="ts">
  /**
   * This component is designed to create tasks.
   * @emits { Object } addTask
   * */

  import { Component, Vue } from 'vue-property-decorator';
  import { ITaskItems } from '@/interfaces/IApplication';

  @Component
  export default class AddTask extends Vue {
    private task: ITaskItems = {
      name: '',
      description: '',
      isChecked: false,
      enclosedTaskItem: [],
    };

    private addItemTaskHandler () {
      const newItem = JSON.parse(JSON.stringify(this.task));
      this.$emit('addItemTaskHandler', newItem);
      this.task.name = '';
      this.task.description = '';
    }
  }
</script>

<style scoped>

</style>
