<template>
  <section class="tasks">
    <draggable
      v-model="tasks"
      animation="250"
    >
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        class="task pa-2 my-2"
        @removeTask="removeTask"
      />
    </draggable>
    <v-card
      outlined
      class="task task__new my-2 pa-2 display-1 d-flex justify-center"
      @click="addTask"
    >
      +
    </v-card>
  </section>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch
} from 'vue-property-decorator'
import draggable from 'vuedraggable'
import Fuse from 'fuse.js'

import Task from './Task.vue'
import { Store } from '../../store'

import { TaskI } from '../../types'

@Component({
  components: {
    draggable,
    Task,
  },
})
export default class Tasks extends Vue {
  @Prop(Object) readonly storage!: Store

  @Prop(Object) readonly search!: { value: string; isVisible: boolean }

  private searchFn: Fuse<TaskI, { keys: ['title'] }> | null = null

  private searchIndex: readonly Fuse.FuseIndexRecord[] | null = null

  private requestTasksUpdate() {
    this.storage.getTasks().then((it) => {
      this.tasks_ = it
    })
  }

  private tasks_: TaskI[] | null = null

  get tasks(): TaskI[] {
    if (!this.tasks_) {
      this.requestTasksUpdate()
      return []
    }

    if (this.search.isVisible && this.search.value && this.searchFn) {
      return this.searchFn.search(this.search.value).map((it) => it.item)
    }

    return this.tasks_
  }

  set tasks(arg) {
    this.tasks_ = arg
  }

  @Watch('tasks_', { deep: true })
  updateSearch() {
    if (this.tasks_) {
      this.searchFn = new Fuse(this.tasks_, { keys: ['title'] })
      this.searchIndex = Fuse.createIndex(['title'], this.tasks_)
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
