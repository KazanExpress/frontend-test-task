<template>
    <div id="app">
           <div class="nav-wrapper">
          <nav id="nav">
          <a href="#" class="brand-logo center">TODO APPLICATION</a>

      </nav>
        </div>
        <router-view/>
        <error-handler></error-handler>
     </div>
</template>
<script lang="ts">
  import ErrorHandler from '@/components/ErrorHandler.vue';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      ErrorHandler,

    },
  })
  export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0px;
  background-color: #222f3e;
}

#nav a {
  font-weight: 100;
  color: #feca57;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
