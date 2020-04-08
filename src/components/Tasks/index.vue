<template>
  <section class="tasks">
    <draggable v-model="tasks">
      <transition-group name="animation">
        <Task-vue
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

import TaskVue from './Task.vue'
import { Task } from '../../store/ProjectStore/Task'

@Component({
  components: {
    draggable,
    TaskVue,
  },
})
export default class Tasks extends Vue {
  @Prop(Array) readonly tasks!: Task[]

  @Prop(Object) readonly search!: { value: string; isVisible: boolean }

  searchFn: Fuse<Task, { keys: ['title'] }> | null = null

  searchIndex: readonly Fuse.FuseIndexRecord[] | null = null

  isDrag = false

  // get localTasks(): Task[] {
  //   if (this.search.isVisible && this.search.value && this.searchFn) {
  //     return this.searchFn.search(this.search.value).map((it) => it.item)
  //   }

  //   return this.tasks
  // }

  // set localTasks(arg) {}

  @Watch('tasks', { deep: true })
  updateSearch() {
    console.log('update search')

    this.searchFn = new Fuse(this.tasks, { keys: ['title', 'description'] })
    this.searchIndex = Fuse.createIndex(['title'], this.tasks)
  }

  addTask() {
    console.log(this.tasks)
    // return

    console.log('addTask')
    this.tasks.push(new Task())
  }

  removeTask(task: Task) {
    this.tasks.splice(this.tasks.indexOf(task), 1)
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
