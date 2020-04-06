<template>

    <div class="row">
        <form class="col s12" @submit.prevent="addItemTaskHandler">
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">note_add</i>
                    <input  v-model="item.name" id="icon_prefix"  placeholder="Имя задачи" type="text" class="validate" required>
                    <label for="icon_prefix"></label>
                </div>
                <div class="input-field col s6">
                    <i class="material-icons prefix">mode_edit</i>
                    <input  v-model="item.description" id="icon_telephone"  placeholder="Описание" type="tel" class="validate" required>
                      <label for="icon_telephone"></label>
                </div>
            </div>
            <button type="submit" class="btn waves-effect waves-light"><i class="material-icons right">add</i>Добавить</button>

        </form>
    </div>

</template>


<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator';
  import { ITaskItems } from '@/interfaces/IApplication';
  // import { required } from 'vuelidate/lib/validators';

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
    input[type=text]:not(.browser-default):focus:not([readonly]) {
        border-bottom: 1px solid #feca57;
        -webkit-box-shadow: 0 1px 0 0 #26a69a;
        box-shadow: 0 1px 0 0 #feca57;
    }
    input[type=tel]:not(.browser-default):focus:not([readonly]) {
        border-bottom: 1px solid #feca57;
        -webkit-box-shadow: 0 1px 0 0 #26a69a;
        box-shadow: 0 1px 0 0 #feca57;
    }
 </style>
