<template>
<!--    <form >-->
<!--        <div class="form-group">-->
<!--            <label for="task_name">Task name</label>-->
<!--            <input v-model="task.name" type="text" class="form-control" id="task_name" placeholder="Please enter task name" required>-->
<!--        </div>-->
<!--        <div class="form-group">-->
<!--            <label for="task_description">Description</label>-->
<!--            <input v-model="task.description" type="text" class="form-control" id="task_description" placeholder="Please enter description for task" required>-->
<!--        </div>-->
<!--    </form>-->

    <div class="row">
        <form class="col s12" @submit.prevent="addItemTaskHandler">
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input  v-model="task.name" id="icon_prefix" type="text" class="validate">
                    <label for="icon_prefix">Имя</label>
                </div>
                <div class="input-field col s6">
                    <i class="material-icons prefix">phone</i>
                    <input  v-model="task.description" id="icon_telephone" type="tel" class="validate">
                    <label for="icon_telephone">Описание</label>
                </div>
            </div>
            <button type="submit" class="btn waves-effect waves-light"><i class="material-icons right">add</i>Добавить</button>

        </form>
    </div>

</template>

<script lang="ts">
  /**
   * This component is designed to create tasks.
   * @emits { Object } addTask
   * */

  import { Component, Vue } from 'vue-property-decorator';
  import { ITaskItems } from '@/interfaces/IApplication';

  @Component
  export default class AddTask extends Vue {
    private task: ITaskItems = {
      name: '',
      description: '',
      isChecked: false,
      enclosedTaskItem: [],
    };

    private addItemTaskHandler () {
      const newItem = JSON.parse(JSON.stringify(this.task));
      this.$emit('addItemTaskHandler', newItem);
      this.task.name = '';
      this.task.description = '';
    }
  }
</script>

<style scoped>
    .btn {
        background-color:#1dd1a1;
        box-shadow: none;
        -webkit-box-shadow: none;
    }
    .btn:hover {
        background-color: #43bc9a;
    }
</style>
