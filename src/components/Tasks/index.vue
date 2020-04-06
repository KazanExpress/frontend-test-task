<template>
  <section class="tasks">
    <draggable v-model="tasks" animation="250">
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @removeTask="removeTask"
        class="task pa-2 my-2"
      />
    </draggable>
    <v-card
      outlined
      class="task task__new my-2 pa-2 display-1 d-flex justify-center"
      @click="addTask"
      >+</v-card
    >
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import Task from './Task.vue'

import { TaskI } from './types'

import { Store } from '../../store'

type TaskT = TaskI[] | Promise<TaskI[]> | null

@Component({
  components: {
    draggable,
    Task,
  },
})
export default class Tasks extends Vue {
  @Prop(Object) readonly storage!: Store

  @Prop(String) readonly search!: string

  private tasks_: TaskT = null

  get tasks(): TaskI[] {
    if (this.tasks_ === null) {
      this.storage.getTasks().then((it) => {
        this.tasks_ = it
      })

      return []
    }
    if (this.tasks_ instanceof Promise) {
      return []
    }
    return this.tasks_
  }

  set tasks(arg) {
    this.tasks_ = arg
  }

  addTask() {
    this.tasks = [
      ...this.tasks,
      { title: '', id: Math.floor(Math.random() * 10000), completed: false },
    ]
  }

  removeTask(task: TaskI) {
    this.tasks = this.tasks.filter((it) => it.id !== task.id)
  }

  beforeCreate() {
    window.addEventListener('beforeunload', () => {
      this.storage.saveTasks(this.tasks_ as TaskI[])
    })
  }
}
</script>

<style>
.tasks {
  column-width: 450px;
}

.task__new {
  height: 100%;
  display: inline-block;
  width: min-content;
}

.task {
  width: 100%;
  display: inline-block;
}

.sortable-ghost {
  border: 1px dotted green !important;
  opacity: 0.5;
}
</style>
