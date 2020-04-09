<template>
  <div>
      <label>
          Transfer todos to:
          <input type="text" placeholder="Enter project name" v-model="projectName" />
      </label>
      <img src="../assets/transfer.png" @click="transferTodos" class="transfer-icon" alt="transfer items"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Transfer extends Vue {
  private projectName: string = '';

  get projects() {
    return this.$store.state.projects;
  }

  private transferTodos() {
    if (this.projects.has(this.projectName)) {
      this.$emit('transfer-todos', this.projectName);
      this.projectName = '';

      return;
    }

    alert('No project with such name exist.');
  }
}
</script>

<style scoped lang="scss">
    .transfer-icon {
        height: 15px;
        vertical-align: middle;
        margin-left: 5px;
        cursor: pointer;
    }
</style>
