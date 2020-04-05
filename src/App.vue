<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',

    beforeCreate: function () {
      this.$store.commit('data/initialiseStore');
    }
  }
</script>

<style>
  #app {
    width: 100vw;
    height: 100vh;
    font-family: "Roboto Light", Helvetica, Arial, sans-serif;
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
  }
</style>
