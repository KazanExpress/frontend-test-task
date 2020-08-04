<template>
  <div>
    <div class="container">
      <img src="@/assets/plus.png" alt="add todo" class="icon" @click="addItem" />
      <input
        type="text"
        :value="projectName()"
        id="projectName"
        v-on:input="projectRenameHandler"
        class="project-name-input"
      />
    </div>
    <div>
      <img src="@/assets/filter.png" @click="changePar" alt="filter" class="icon" />
      <input
        type="text"
        placeholder="Start typing task name"
        v-on:input="filterHandler"
        :value="this.$store.state.filters.filterValue"
        class="filter-input"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

let par = false;
console.log(par);

@Component
export default class ProjectName extends Vue {
  private channel!: BroadcastChannel;

  public beforeCreate() {
    this.channel = new BroadcastChannel('projects-channel');
  }

  private projectName() {
    if (sessionStorage.getItem('projectName') !== null) {
      let name = sessionStorage.getItem('projectName');
      this.$store.commit('updateProjectName', name);
    }

    return this.$store.state.projectName;
  }

  private projectRenameHandler(input: Event) {
    let target = input.target as HTMLInputElement;

    this.channel.postMessage({
      event: 'add_project',
      old: this.$store.state.projectName,
      project: target.value,
    });

    this.$store.commit('updateProjectName', target.value);
  }

  private filterHandler(input: Event) {
    let target = input.target as HTMLInputElement;
    this.$store.commit('changeFilter', target.value);
  }

  private addItem() {
    this.$store.commit('addItem');
  }
}
</script>

<style scoped lang="scss">
.container {
  text-align: left;
  display: flex;
}
.project-name-input {
  font-size: xx-large;
  border: none;
  font-weight: bold;
  margin-bottom: 30px;
}

.filter-input {
  font-size: 21px;
  border: none;
  margin-bottom: 30px;
}

.icon {
  padding-right: 10px;
  margin-top: 10px;
  margin-left: 30px;
  height: 15px;
  cursor: pointer;
}

.save-button {
  background-color: white;
  color: #3866bb;
  border: 1px solid #3866bb;
  border-radius: 5px;
  font-size: 15px;
  margin-left: 10px;
}

.transfer-icon {
  height: 15px;
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
}
</style>
