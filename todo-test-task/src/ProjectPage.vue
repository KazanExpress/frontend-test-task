<template>
  <div class="main" >
    <ProjectName></ProjectName>
    <Todos v-on:transfer-todos="transferTodos"></Todos>
    <Transfer
            v-on:transfer-todos="transferTodos"
            id="0"
            label="Transfer all todos"
    ></Transfer>
    <button @click="exportToJson" class="export-button">Export project</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectName from '@/components/ProjectName.vue';
import Todos from '@/components/Todos.vue';
import {IItem} from '@/interfaces/IStore';
import Transfer from '@/components/Transfer.vue';

@Component({
  components: {
    ProjectName,
    Todos,
    Transfer,
  },
})
export default class ProjectPage extends Vue {
  private channel!: BroadcastChannel;

  get items() {
    return this.$store.state.items;
  }

  private getItem(id: string) {
    return this.$store.getters.item(id);
  }

  public beforeCreate() {
    this.channel = new BroadcastChannel('projects-channel');

    this.channel.onmessage = (messageEvent: any) => {
      if (messageEvent.data.event === 'transfer_items') {
        console.warn('got items');
        if (messageEvent.data.project === this.$store.state.projectName){
          messageEvent.data.items.forEach((item: IItem) => {
            this.$store.commit('pushItem', item);
          });
        }

        return;
      }

      if (messageEvent.data.event === 'add_project') {
        console.warn('got project');
        if (messageEvent.data.old){
          this.$store.commit('deleteProject', messageEvent.data.old);
        }
        this.$store.commit('addProject', messageEvent.data.project);

        return;
      }
    };

    this.channel.postMessage({
      event: 'add_project',
      project: this.$store.state.projectName,
    });
  }

  private exportToJson() {
    let content = JSON.stringify(this.$store.state);
    let fileName = `${this.$store.state.projectName}'.txt`;
    const data = `data:text/plain;charset=utf-8,'${encodeURIComponent(content)}`;
    const link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', fileName);
    link.click();
  }

  private transferTodos(project: string, id: string) {
    let items = id === '0' ? this.items : [this.getItem(id)];

    this.channel.postMessage({
      event: 'transfer_items',
      project,
      items,
    });

    if (id === '0'){
      this.$store.commit('clearItems');

      return;
    }

    this.$store.commit('deleteItem', id);
  }
}
</script>

<style scoped lang="scss">
  .main {
    position: relative;
  }

  .export-button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 5px 15px;
    font-size: 16px;
    margin-top: 10px;
  }
</style>
