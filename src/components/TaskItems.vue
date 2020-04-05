<template>
    <draggable
            :list="taskItems"
            :group="{ name: 'task-items' }"
            :empty-insert-threshold="dropAreaSize"
            class="dragArea"
    >
        <div v-for="(item, i) in taskItems"
             :key="i"
             class="card cursor-pointer mb-5 text-left"
        >
            <div class="card-header d-flex justify-content-between">
                <h4>{{item.name}}</h4>
                <button @click="$emit('destroyTask', { index: i, taskItems })" type="button" class="btn btn btn-secondary btn-sm font-weight-bold">&times;</button>
            </div>
            <div class="card-body">
                <p class="card-text">{{item.description}}</p>
            </div>
            <div class="custom-control custom-checkbox mb-3 ml-4 mr-4">
                <input
                        :checked="item.isChecked"
                        @change="item.isChecked = !item.isChecked"
                        :id="`task_check${i}`"
                        type="checkbox"
                        class="custom-control-input"
                        required
                >
                <label class="custom-control-label" :for="`task_check${i}`">{{ checkedText | isCheckedFilter(item.isChecked) }}</label>
            </div>
            <task-items
                    @destroyTask="$listeners.destroyTask"
                    :taskList="item.enclosedTaskItem"
                    class="ml-4 mr-4"
            ></task-items>
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

  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AddDescription from '@/components/AddDescription.vue';
  import { ITaskItems } from '@/interfaces/IApplication';
  import Draggable from 'vuedraggable';

  interface IActionTask {
    isChangeName: false;
  }

  @Component({
    components: {
      AddDescription,
      Draggable,

    },
    filters: {
      isCheckedFilter: function (checkedText: string, isChecked: boolean): string {
        if (isChecked) {

          return checkedText;
        } else {

          return 'Note done';
        }

      },
    },
  })
  export default class TaskItems extends Vue {
    private readonly dropAreaSize = 100;
    private checkedText = 'Done';
    @Prop({ required: true, type: Array })
    public taskItems!: ITaskItems[];
  }
</script>

<style scoped>

</style>
