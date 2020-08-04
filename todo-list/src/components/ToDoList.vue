<template>
  <div class="main" >
    <ProjectName/>
    <List v-on:transfer-todos="transferTodos"/>
    <button @click="exportToJson" class="export-button">Export project</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectName from './ProjectName.vue';
import List from './List.vue';
import {Item} from '../store/interfaces';
import Transfer from './Transfer.vue';

@Component({
  components: {
    ProjectName,
    List,
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
          messageEvent.data.items.forEach((item: Item) => {
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
     this.$store.commit('exportProject');
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
    background-color: white; 
    color:  #4CAF50; 
    border: 2px solid #4CAF50;
    border-radius: 20px;
    padding: 5px 15px;
    font-size: 20px;
    margin-top: 10px;
  }

  .export-button:hover {
    background-color: #4CAF50;
    color: white;
  }



  
</style>
