<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <div class="container border text-center">
        <router-view/>
      </div>
    </transition>
    <error></error>
  </div>
</template>

<script lang="ts">
import Error from '@/components/error.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Error
  }
})
export default class App extends Vue {}
</script>

<style>
html, body, #app {
  height: 100%;
  background-color: #e2e2e2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 60px;
  position: relative;
}
.cursor-pointer {
  cursor: pointer;
}

/*toggle animation components*/
.slide-fade-enter-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}
</style>
