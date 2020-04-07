<template>
    <div class="flexbox">
        <draggable
                :list="taskItems"
                :group="{ name: 'task-items' }"
                :empty-insert-threshold="dropAreaSize"
                class="dragArea"
        >
            <div v-for="(item, i) in taskItems"
                 :key="i"
                 class="card"
            >
                <div class="card-header">
                    <h2 class="card-subtitle">{{item.name}}</h2>
                    <div class="delete">
                        <button @click="$emit('destroyTask', { index: i, taskItems })" type="button" class="btn-floating btn-small waves-effect waves-light red accent-2">
                            <i class="large material-icons">close</i>
                        </button>
                    </div>
                </div>

                <div class="card-body">
                    <p class="card-text">{{item.description}}</p>
                </div>
                <div class="switch">
                    <label>

                        <input  :checked="item.isChecked"
                                @change="item.isChecked = !item.isChecked"
                                :id="`task_check${i}`"
                                type="checkbox">
                        <span class="lever"></span>

                    </label>
                </div>
                <div class="switch">
                    <input
                            :checked="item.isChecked"
                            @change="item.isChecked = !item.isChecked"
                            :id="`task_check${i}`"
                            type="checkbox"
                            class="lever"
                            required
                    >
                    <label class="lever" :for="`task_check${i}`">{{ checkedText | isCheckedFilter(item.isChecked) }}</label>
                </div>
                <task-items
                        @destroyTask="$listeners.destroyTask"
                        :taskItems="item.enclosedTaskItem"
                        class="ml-4 mr-4"
                ></task-items>
            </div>
        </draggable>
    </div>


</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import AddDescription from '@/components/AddDescription.vue';
  import { ITaskItems } from '@/interfaces/IApplication';
  import TaskApp from '@/views/TaskApp.vue';
  import Draggable from 'vuedraggable';



  interface IActionTask {
    isChangeName: false;
  }

  @Component({
    components: {
      Draggable,
      AddDescription,


    },
    filters: {
      isCheckedFilter: function (checkedText: string, isChecked: boolean): string {
        if (isChecked) return checkedText;

          return 'Не сделана';
      },
    },
  })
  export default class TaskItems extends Vue {
    private readonly dropAreaSize = 80;
    private checkedText = 'Сделана';
    @Prop({ required: true, type: Array })
    public taskItems!: ITaskItems[];
  }
</script>

<style scoped>
    * {
        /*margin: 0;*/
        /*padding: 0;*/
        box-sizing: border-box;
    }
    .dragArea {
        /*display: contents;*/
    }
    .flexbox {
        display: flex;
        justify-content: center;

        width: 768px;
        max-width: 768px;
        height: auto;        /*overflow: hidden;*/
        margin: 0 auto;
        padding: 15px;
    }
    .flexbox .board {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 300px;
        padding: 15px;
        background-color: #222f3e;
    }
    .flexbox .board .card {
        padding: 15px 25px;
        background-color: #f1c054;
        cursor: pointer;
        margin-bottom: 15px;
    }
    .card-header {
        display: flex;
        justify-content: center;

    }
    .card-subtitle {
        font-size: 2.5rem;
        font-weight: 100;
    }
    .card-body {
        height: 50px;
    }
    .card-text {
        font-size: 1.2rem;
        font-weight: 500;
    }
    .btn-small:hover, .btn-floating:hover {
        box-shadow: none;
        -webkit-box-shadow: none;
    }
    .delete {
        float: left;
    }

</style>
