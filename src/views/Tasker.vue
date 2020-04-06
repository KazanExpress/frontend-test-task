<template>
  <div class="task-block">
    <div class="row s6">
      <div class="row">
        <div class="mb-3">
          <h1
                  v-if="!isChangeName"
                  @click="isChangeName = !isChangeName"
                  class="subtitle"
          >{{name}}</h1>
          <add-description
                  v-else
                  :text="name"
                  @updateTaskDescription="updateName"
                  @saveEmitter="toggleVisible"
          ></add-description>
        </div>

      </div>
      <div class="col-6 col-sm-12 col-md-6 text-left">
        <add-task @addTask="addTask"></add-task>
      </div>
    </div>
    <div class="row justify-content-center">
      <task-items
              @destroyTask="destroyTask"
              :taskItems="taskItems"
              class="col col-md-12"
      ></task-items>

              <export-j-s-o-n
                      :jsonName="name"
                      :formatJson="formatFileExport"
                      :data="dataForExport"
              ></export-j-s-o-n>
    </div>
  </div>
</template>

<script lang="ts">

  import { Component, Emit, Vue } from 'vue-property-decorator';
  import store from '@/store';
  import { namespace } from 'vuex-class';
  import AddDescription from '@/components/AddDescription.vue';
  import TaskItems from '@/components/TaskItems.vue';
  import AddTask from '@/components/AddTask.vue';
  import ExportJSON from '@/components/ExportJSON.vue';
  import { ITaskItems } from '@/interfaces/IApplication';

  const tasker = namespace('tasker');

  Component.registerHooks([
    'beforeRouteEnter'
  ]);

  @Component({
    components: {
      AddDescription,
      TaskItems,
      AddTask,
      ExportJSON,
    },
  })
  export default class Tasker extends Vue {
    @tasker.State
    public name!: string;

    @tasker.State
    private taskItems!: ITaskItems[];

    private isChangeName = false;
    private formatFileExport = 'json';

    get dataForExport () {
      return JSON.stringify({
        taskItems: this.taskItems,
      });
    }

    @Emit('updateTaskDescription')
    public updateName (text: string): void {
      this.$store.commit('tasker/updateName', text);
    }

    @Emit('saveEmitter')
    public toggleVisible (): void {
      this.isChangeName = false;
    }

    @Emit('addTask')
    public addTask (item: ITaskItems): void {
      this.taskItems.unshift(item);
    }

    @Emit('destroyTask')
    public destroyTask ({ index, taskItems }: { index: number; taskItems: ITaskItems[] }): void {
      taskItems.splice(index, 1);
    }

    public async beforeRouteEnter (to: any, from: any, next: any) {
      const taskerName = to.query.name;
      if (typeof taskerName === 'undefined') {
        next('/');
      }
      await store.dispatch('tasker/search', { name: taskerName });
      if (store.state.tasker.name !== taskerName) {
        next('/');
      }
      next();
    }
  }
</script>

<style scoped>
.task-block {
  width: 700px;
  text-align: center;
  justify-content: stretch;
  display: inline-block;

}
  .subtitle {
    font-weight: 100;
    font-size: 3em;
  }
</style>
