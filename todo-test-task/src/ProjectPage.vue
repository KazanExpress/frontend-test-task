<template>
  <div id="main">
    <ProjectName></ProjectName>
    <Todos></Todos>
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
export default class ProjectPage extends Vue {}
</script>

<style scoped lang="scss"></style>
