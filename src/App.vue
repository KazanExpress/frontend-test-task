<template>
  <div id="app">
    <Toolbar />
    <Tasks />
    <Tabs />
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
import Tasks from './components/Tasks.vue'
import Tabs from './components/Tabs.vue'



export default {
  name: 'App',
  components: {
    Toolbar, Tasks, Tabs
  },

  beforeMount() {
    if (!this.$store.state.Tabs.isDuplicateTab()){
      this.$store.commit('loadTasksFromSS')
    }

  }
}
</script>

<style lang="scss">
#app {
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @import "src/scss/toolbar";
  @import "src/scss/tasks";
  @import "src/scss/tabs";

  .user_select_disable{
    user-select: none;
  }
}
</style>
