<template>
  <section class="tasks d-flex flex-column pa-3">
    <div class="d-flex mb-2">
      <v-text-field
        v-model="name_"
        class="title mr-3"
        placeholder="Section name"
        dense
        flat
        hide-details
        solo
      />
      <v-icon id="handle" class="cursor-grab">
        mdi-camera-control
      </v-icon>
    </div>
    <v-progress-linear
      class="pb-1"
      :value="
        (filteredTasks.filter((it) => it.completed).length /
          filteredTasks.length) *
        100
      "
    />
    <draggable
      ref="taskContainer"
      v-model="tasks_"
      class="tasks__container"
      group="task"
      animation="250"
    >
      <!-- <transition-group name="animation"> -->
      <Task-vue
        v-for="task in filteredTasks"
        :key="task.id"
        :title.sync="task.title"
        :description.sync="task.description"
        :completed="task.completed"
        class="task pa-2 my-2"
        @remove-task="removeTask(task)"
      />
      <!-- </transition-group> -->
    </draggable>
    <v-card
      outlined
      class="task task__new my-2 pa-2 d-flex justify-center"
      @click="addTask"
    >
      +
    </v-card>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Emit,
  Watch,
  PropSync,
} from 'vue-property-decorator'
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
export default class TaskList extends Vue {
  @PropSync('tasks', { type: Array }) readonly tasks_!: Task[]

  @PropSync('name', { type: String }) readonly name_!: string

  @Prop(String) readonly search!: string

  searchFn: Fuse<Task, { keys: [] }> | null = null

  get filteredTasks() {
    if (this.search && this.searchFn) {
      return this.searchFn.search(this.search).map((it) => it.item)
    }

    return this.tasks_
  }

  @Watch('tasks', { deep: true })
  updateSearch() {
    this.searchFn = new Fuse(this.tasks_, {
      keys: ['title', 'description'],
    })
  }

  @Emit()
  addTask() {
    // @ts-ignore
    this.$refs.taskContainer.$el.scrollTop = this.$refs.taskContainer.$el.scrollHeight
  }

  @Emit()
  removeTask(task: Task) {}
}
</script>

<style>
.tasks {
  background-color: #1b1b1b;
}

.cursor-grab {
  cursor: grab;
}

.tasks__title {
  /* width: 80%; */
}

.task__new {
  /* height: 100%; */
}

.task {
  /* transition: all 1s; */
  /* width: 400px; */
  /* display: inline-block; */
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
