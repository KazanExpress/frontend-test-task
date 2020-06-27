<template>
  <div id="app">
    <Toolbar />
    <TasksC />
    <Tabs />
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
import TasksC from './components/Tasks.vue'
import Tabs from './components/Tabs.vue'

export default {
  name: 'App',
  components: {
    Toolbar, TasksC, Tabs
  }
}
</script>

<style lang="scss">
#app {
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @import "src/scss/toolbar";
  @import "src/scss/tasks";
  @import "src/scss/tabs";
}
</style>
