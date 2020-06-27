<template>
  <div class="taskscomponent_wrap">
    <div v-for="i in 3" :key="i">
    <TasksPanel :tasks="tasks"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TasksPanel from './TasksPanel'
export default {
  components: {
    TasksPanel
  },
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters({ tasks: 'getTasks' })
  },
  mounted () {
    this.$store.dispatch('fetchTasks').then(() => {
    })
  }
}
</script>
<style scoped lang="scss">
</style>
