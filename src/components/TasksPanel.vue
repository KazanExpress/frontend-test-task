<template>
  <div class="panel">
    <div class="panel_header">
      <div>Имя списка</div>
      <button>Новая задача</button>
    </div>
    <div class="task" v-for="item in tasks" :key="item.id">
      <h2>{{item.id}}</h2>
      <div class="title"> {{item.title}}</div>
      <div class="completed">Complete: {{item.completed}}</div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { mapState } from 'vuex'
export default {
  props: {
    tasks: {}
  },
  computed: {
    ...mapState(['Todo'])
  },
  data: () => {
    return {}
  },
  mounted () {
  }

}
</script>
