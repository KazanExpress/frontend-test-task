<template>
  <section>
    <div class="wrapper">
      <draggable
        v-model="localSections"
        delay="150"
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
          @add-task="addTask(section)"
          @remove-task="removeTask(section, $event)"
        />
        <v-btn
          class="text-none mx-1"
          @click="addColumn"
        >
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

  // @Emit() // i have no idea why it doesnt work
  removeTask(section: Section, task: Task) {
    this.$emit('remove-task', section, task)
  }

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
