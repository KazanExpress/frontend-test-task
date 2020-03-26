<template>
  <div id="main">
    <ProjectName></ProjectName>
    <Todos></Todos>
    <button @click="exportToJson" class="export-button">Export project</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProjectName from "@/components/ProjectName.vue";
import Todos from "@/components/Todos.vue";


@Component({
  components: {
    ProjectName,
    Todos,
  }
})
export default class ProjectPage extends Vue {
  exportToJson() {
    let content = JSON.stringify(this.$store.state);
    let fileName = this.$store.state.projectName + ".txt";
    const data = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
    const link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", fileName);
    link.click();
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
