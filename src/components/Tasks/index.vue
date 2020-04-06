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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import * as JsSearch from 'js-search'

import Task from './Task.vue'
import { Store } from '../../store'

import { TaskI } from '../../types'

type TaskT = TaskI[] | null

@Component({
  components: {
    draggable,
    Task,
  },
})
export default class Tasks extends Vue {
  @Prop(Object) readonly storage!: Store

  @Prop(Object) readonly search!: { value: string; isVisible: boolean }

  private searchFn = new JsSearch.Search('isBn')

  private requestTasksUpdate() {
    this.storage.getTasks().then((it) => {
      this.tasks_ = it
    })
  }

  private tasks_: TaskT = null

  get tasks(): TaskI[] {
    if (!this.tasks_) {
      this.requestTasksUpdate()
      return []
    }

    if (this.search.isVisible && this.search.value) {
      return this.searchFn.search(this.search.value) as TaskI[]
    }

    return this.tasks_
  }

  set tasks(arg) {
    this.tasks_ = arg
  }

  @Watch('search', { deep: true })
  @Watch('tasks_', { deep: true })
  updateSearch() {
    if (this.tasks_) {
      this.searchFn.addDocuments(this.tasks_)
    }
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

  mounted() {
    // this.searchFn.indexStrategy = new JsSearch.AllSubstringsIndexStrategy()
    this.searchFn.addIndex('title')
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
