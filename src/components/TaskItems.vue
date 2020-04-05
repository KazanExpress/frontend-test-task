<template>

    <draggable
            :list="taskItems"
            :group="{ name: 'task-items' }"
            :empty-insert-threshold="dropAreaSize"
            class="dragArea col s12 m7"
    >
        <div v-for="(item, i) in taskItems"
             :key="i"
             class="card cursor-pointer mb-5 text-left"
        >
            <div class="card-header ">
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
                    :taskItems="item.enclosedTaskItem"
                    class="ml-4 mr-4"
            ></task-items>
        </div>
    </draggable>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AddDescription from '@/components/AddDescription.vue';
  import { ITaskItems } from '@/interfaces/IApplication';
  import Draggable from 'vuedraggable';
  import TaskApp from '@/views/TaskApp.vue';

  interface IActionTask {
    isChangeName: false;
  }

  @Component({
    components: {
      TaskApp,
      Draggable,
      AddDescription,

    },
    filters: {
      isCheckedFilter: function (checkedText: string, isChecked: boolean): string {
        if (isChecked) return checkedText;

          return 'Note done';
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
    .dragArea {
     display: contents;
    }
    .card-header {
        display: flex;
        justify-content: space-between;

    }
    .card-body {

    }
    .card-text {

    }
</style>
