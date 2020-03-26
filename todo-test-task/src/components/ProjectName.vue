<template>
  <div class="container">
    <label>
      <input type="text"
             :value="projectName()"
             id="projectName"
             v-on:input="projectRenameHandler"/>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ProjectName extends Vue {
  projectName() {
    return this.$store.state.projectName;
  };

  projectRenameHandler(input: Event){
    let target = input.target as HTMLInputElement;
    this.$store.commit("updateProjectName", target.value);
  }
}
</script>

<style scoped lang="scss">
.container {
  line-height: 30px;
  margin: 30px 0 15px 30px;
  text-align: left;
  display: flex;
}
input {
  font-size: xx-large;
  border: none;
  font-weight: bold;
}
</style>
