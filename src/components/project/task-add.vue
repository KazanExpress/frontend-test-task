<template>
  <form @submit.prevent="addTask">
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

import { Component, Vue } from 'vue-property-decorator'
import { ITask } from '@/store/models'

@Component
export default class TaskAdd extends Vue {
  private task: ITask = {
    name: '',
    description: '',
    mark: false,
    nestedTasks: []
  }

  private addTask () {
    const newTask = JSON.parse(JSON.stringify(this.task))
    this.$emit('addTask', newTask)
    this.task.name = ''
    this.task.description = ''
  }
}
</script>

<style scoped>

</style>
