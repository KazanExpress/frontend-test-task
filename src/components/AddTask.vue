<template>

    <div class="row">
        <form class="col s12" @submit.prevent="addItemTaskHandler">
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">note_add</i>
                    <input  v-model="item.name" id="icon_prefix" type="text" class="validate" required>
                   <p>Имя задачи</p>   <label for="icon_prefix"></label>
                </div>
                <div class="input-field col s6">
                    <i class="material-icons prefix">mode_edit</i>
                    <input  v-model="item.description" id="icon_telephone" type="tel" class="validate" required>
                    <p>Описание</p>  <label for="icon_telephone"></label>
                </div>
            </div>
            <button type="submit" class="btn waves-effect waves-light"><i class="material-icons right">add</i>Добавить</button>

        </form>
    </div>

</template>


<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator';
  import { ITaskItems } from '@/interfaces/IApplication';

  @Component
  export default class AddTask extends Vue {
    private item: ITaskItems = {
      name: '',
      description: '',
      isChecked: false,
      enclosedTaskItem: [],
    };

    private addItemTaskHandler () {
      const newItem = JSON.parse(JSON.stringify(this.item));
      this.$emit('addTask', newItem);
      this.item.name = '';
      this.item.description = '';
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
