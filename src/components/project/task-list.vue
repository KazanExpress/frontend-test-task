<template>
  <draggable
    v-model="taskList"
    :group="{ name: 'task-list' }"
    :empty-insert-threshold="dropAreaSize"
    class="dragArea"
  >
    <div v-for="(task, i) in taskList"
         :key="i"
         class="card cursor-pointer mb-5 text-left"
    >
      <div class="card-header d-flex justify-content-between">
        <h4>{{task.name}}</h4>
        <button @click="$emit('destroyTask', { index: i, taskList })" type="button" class="btn btn btn-secondary btn-sm font-weight-bold">&times;</button>
      </div>
      <div class="card-body">
        <p class="card-text">{{task.description}}</p>
      </div>
      <div class="custom-control custom-checkbox mb-3 ml-4 mr-4">
        <input
          :checked="task.mark"
          @change="task.mark = !task.mark"
          :id="`task_mark${i}`"
          type="checkbox"
          class="custom-control-input"
          required
        >
        <label class="custom-control-label" :for="`task_mark${i}`">{{ markFlagText | markFlagFilter(task.mark) }}</label>
      </div>
      <task-list
        @destroyTask="$listeners.destroyTask"
        :taskList="task.nestedTasks"
        class="ml-4 mr-4"
      ></task-list>
    </div>
  </draggable>
</template>

<script lang="ts">
/**
 * This component is designed to display tasks list.
 * It also has a nested same component that recursively displays nested tasks
 * Due to the dependency vuedraggable, the user may use Drag end drop and move tasks to a nested list with potentially infinite depth
 * @param { Array } taskList
 * */

import { Component, Prop, Vue } from 'vue-property-decorator'
import ChangeText from '@/components/project/change-text.vue'
import { ITask } from '@/store/models'
import Draggable from 'vuedraggable'

interface IActionTask {
  isChangeName: false;
}

@Component({
  components: {
    Draggable,
    ChangeText
  },
  filters: {
    markFlagFilter: function (markFlagText: string, mark: boolean): string {
      if (mark) return markFlagText
      return 'Note done'
    }
  }
})
export default class TaskList extends Vue {
  private readonly dropAreaSize = 80
  private markFlagText = 'Done'
  @Prop({ required: true, type: Array })
  taskList!: ITask[]
}
</script>

<style scoped>

</style>
