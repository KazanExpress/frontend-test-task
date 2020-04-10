<template>
  <section>
    <div class="wrapper">
      <draggable
        v-model="localSections"
        group="section"
        class="d-flex"
        handle="#handle"
      >
        <task-list
          v-for="(section, index) in localSections"
          :key="section.name + index"
          class="task-list-item flex-shrink-0 mx-1"
          :search="search"
          :tasks.sync="section.tasks"
          :name.sync="section.name"
          @add-task="addTask"
          @remove-task="removeTask"
        />
        <v-btn class="text-none mx-1" @click="addColumn">
          Add new column
        </v-btn>
      </draggable>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, PropSync } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import TaskList from './TaskList.vue'
import { Task } from '../../store/ProjectStore/Task'
import { Section } from '../../store/ProjectStore/Section'

@Component({
  components: { TaskList, draggable },
})
export default class TaskGroup extends Vue {
  @PropSync('sections', { type: Array }) readonly localSections!: Section[]

  @Prop(String) readonly search!: string

  @Emit()
  addTask(section: Section) {}

  @Emit()
  removeTask(section: Section, task: Task) {}

  @Emit()
  addColumn() {}
}
</script>

<style>
.wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-x: scroll;
}

.wrapper::-webkit-scrollbar {
  display: none;
}

.task-list-item {
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: min-content;
  max-height: 90vh;
  overflow-y: scroll;
}

.task-list-item::-webkit-scrollbar {
  display: none;
}
</style>
