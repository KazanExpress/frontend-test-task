<template>
  <div id="main">
    <ProjectName></ProjectName>
    <Todos></Todos>
    <button @click="exportToJson" class="export-button">Export project</button>
    <Transfer v-on:transfer-todos="transferTodos"></Transfer>
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

  private transferTodos(project: string) {
    this.channel.postMessage({
      event: 'transfer_items',
      project,
      items: this.$store.state.items,
    });
    this.$store.commit('clearItems');
  }
}
</script>

<style scoped lang="scss">
  .export-button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    position: fixed;
    left: 45px;
  }
</style>
