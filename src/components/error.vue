<template>
  <div v-if="$store.state.error.show" class="alert-error alert alert-danger alert-dismissible m-auto">
    <button @click="$store.commit('toggleError', {})" type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>Error!</strong>
    <br>
    <strong>Message:</strong> {{$store.state.error.message}}
  </div>
</template>

<script lang="ts">
/**
 * This component is designed to display errors.
 */

import { Vue } from 'vue-property-decorator'

export default class App extends Vue {}
</script>

<style scoped>
  .alert-error {
    position: absolute;
    display: inline-block;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
