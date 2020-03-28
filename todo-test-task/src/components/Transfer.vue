<template>
  <div>
      <label>
          Transfer todos to:
          <input type="text" placeholder="Enter project name" v-model="projectName" />
      </label>
      <button @click="transferTodos">Transfer todos</button>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component } from 'vue-property-decorator';

@Component
export default class Transfer extends Vue {
  private projectName: string = '';

  get projects() {
    return this.$store.state.projects;
  }

  private transferTodos() {
    if (this.projects.has(this.projectName)) {
      this.$emit('transfer-todos', this.projectName);

      return;
    }

    alert('No project with such name exist.');
  }
}
</script>
