<template>
  <div class="container">
    <label>
      <input type="text" v-model="projectName" id="projectName" />
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ProjectName extends Vue {
  projectName = "Project name";
}
</script>

<style scoped lang="scss">
.container {
  line-height: 30px;
  margin: 30px 0 0 30px;
  text-align: left;
  display: flex;
}
input {
  font-size: xx-large;
  border: none;
  font-weight: bold;
}
</style>
