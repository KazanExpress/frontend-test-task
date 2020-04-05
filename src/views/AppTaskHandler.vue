<template>
  <div class="text-center align-items-center">
    <div class="mb-4 row">
      <div class="col-6 col-sm-12 col-md-6 text-left">
        <div class="mb-3">
          <h1
                  v-if="!isChangeName"
                  @click="isChangeName = !isChangeName"
                  class="cursor-pointer m-0 d-inline-block"
          >{{name}}</h1>
          <add-description
                  v-else
                  :text="name"
                  @updateText="updateName"
                  @customAction="toggleVisible"
          ></add-description>
        </div>
        <export-j-s-o-n
                :filename="name"
                :format-file="formatFileForExport"
                :data="dataForExport"
        ></export-j-s-o-n>
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
  export default class AppTaskHandler extends Vue {
    @tasker.State
    public name!: string;

    @tasker.State
    private taskItems!: ITaskItems[];

    private isChangeName = false;
    private formatFileForExport = 'json';

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
    public addTask (task: ITaskItems): void {
      this.taskItems.unshift(task);
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

</style>
