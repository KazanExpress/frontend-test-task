<template>
  <div class="container">
      <label>
          {{label}}
          <input type="text" placeholder="Project name" v-model="projectName" />
      </label>
      <img src="../assets/transfer.png" @click="transferTodos" class="transfer-icon" alt="transfer items"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Transfer extends Vue {
  @Prop() private id!: string;
  @Prop() private label!: string;
  private projectName: string = '';

  get projects() {
    return this.$store.state.projects;
  }

  private transferTodos() {
    if (this.projects.has(this.projectName)) {
      this.$emit('transfer-todos', this.projectName, this.id);
      this.projectName = '';

      return;
    }

    alert('No project with such name exist.');
  }
}
</script>

<style scoped lang="scss">
    .container {
        height: 25px;
        margin: 10px 0 10px 0;
    }
    .transfer-icon {
        height: 15px;
        vertical-align: middle;
        margin-left: 5px;
        cursor: pointer;
    }
</style>
