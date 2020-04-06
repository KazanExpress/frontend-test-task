<template>
  <section class="tasks">
    <draggable v-model="tasks">
      <transition-group name="animation">
        <Task
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          class="task pa-2 my-2"
          @removeTask="removeTask"
        />
        <v-card
          key="special"
          outlined
          class="task task__new my-2 pa-2 display-1 d-flex justify-center"
          @click="addTask"
        >
          +
        </v-card>
      </transition-group>
    </draggable>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import Fuse from 'fuse.js'

import Task from './Task.vue'
import { Store } from '../../store'
import { saveStateTasks } from '../../globals'

import { TaskI } from '../../types'

@Component({
  components: {
    draggable,
    Task,
  },
})
export default class Tasks extends Vue {
  @Prop(Object) readonly store!: Store

  @Prop(Object) readonly search!: { value: string; isVisible: boolean }

  searchFn: Fuse<TaskI, { keys: ['title'] }> | null = null

  searchIndex: readonly Fuse.FuseIndexRecord[] | null = null

  isDrag = false

  requestUpdate() {
    this.requestTasksUpdate()
  }

  requestTasksUpdate() {
    this.store.getTasks().then((it) => {
      this.tasks_ = it
    })
  }

  tasks_: TaskI[] | null = null

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
    saveStateTasks.set('saveTasks', {
      storeFn: this.store.saveTasks.bind(this.store),
      getValue: () => this.tasks_,
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
}

.task {
  transition: all 1s;
  width: 100%;
  display: inline-block;
}

.sortable-ghost {
  border: 1px dotted green !important;
  opacity: 0.5;
}

.animation-enter,
.animation-leave-to {
  /* .list-complete-leave-active below version 2.1.8 { */
  opacity: 0;
  transform: translateY(30px);
}
.animation-leave-active {
  position: absolute;
}
</style>
