<template>
    <div class="container">
        <div class="row">
            <div class="col s12">
                <h2 class="subtitle">Предварительная настройка</h2>
            </div>
            <div class="col s12">


        <import-j-s-o-n @fetchJson="fetchJson"></import-j-s-o-n>
        <button @click="fetchJson({ jsonName: name, taskItems })" class="btn waves-effect waves-light">Новый проект
            <i class="material-icons right">add</i>
        </button>
            </div>
        </div>
    </div>

</template>

<script lang="ts">

  import ImportJSON from '@/components/ImportJSON.vue';
  import { Component, Emit, Vue } from 'vue-property-decorator';
  import { ITaskItems } from '@/interfaces/IApplication';
  import { namespace } from 'vuex-class';

  const tasker = namespace('tasker');
  @Component({
    components: {
      ImportJSON,
    },
  })
  export default class TaskApp extends Vue {
    @tasker.State
    public name!: string;

    @tasker.State
    private taskItems!: ITaskItems[];

    @Emit('fetchJson')
    public fetchJson({ jsonName, taskItems }: { jsonName: string; taskItems: ITaskItems[] }): void {
      this.$store.commit('tasker' + '/storageSaveTasks', {
        name: jsonName,
        taskItems,
      });
      this.$router.push({ name: 'Tasker', query: { name: jsonName } });
    }
  }
</script>

<style scoped>
    .btn {
        background-color: #42b983;
        box-shadow: none;
        -webkit-box-shadow: none;

    }
    .btn:hover {
        background-color: #6eb796;
    }
    .subtitle {
        color: #222f3e;
        font-weight: 100;
    }

</style>
