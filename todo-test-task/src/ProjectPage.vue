<template>
  <div id="main">
    <ProjectName></ProjectName>
    <Todos></Todos>
    <button @click="exportToJson" class="export-button">Export project</button>
    <button @click="transferTodos" >Transfer todos</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProjectName from "@/components/ProjectName.vue";
import Todos from "@/components/Todos.vue";
import {IItem} from '@/interfaces/IStore';

@Component({
  components: {
    ProjectName,
    Todos,
  }
})
export default class ProjectPage extends Vue {
  channel!: BroadcastChannel;

  beforeCreate() {
    this.channel = new BroadcastChannel('projects-channel');

    this.channel.onmessage = (messageEvent: any) => {
      if (messageEvent.data.event === 'transfer_items') {
        console.warn('git it');
        if (messageEvent.data.project === this.$store.state.projectName){
          messageEvent.data.items.forEach((item: IItem) => {
            this.$store.commit('pushItem', item);
          })
        }
      }
    };
  }

  exportToJson() {
    let content = JSON.stringify(this.$store.state);
    let fileName = this.$store.state.projectName + ".txt";
    const data = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
    const link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", fileName);
    link.click();
  }

  transferTodos() {
    this.channel.postMessage({
      event: 'transfer_items',
      project: 'New project2',
      items: this.$store.state.items,
    });
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
