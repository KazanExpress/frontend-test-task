<template>
  <div class="taskscomponent_wrap">
      <TasksPanel :tasks="taskList" v-for="taskList in tasks" :key="taskList.id"/>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import TasksPanel from './TasksPanel';

  export default {
    components: {
      TasksPanel,
    },
    data: () => {
      return {};
    },
    computed: {
      ...mapGetters({tasks: 'getTasks'}),
    },
    mounted() {
      this.$store.dispatch('fetchTasks').then(() => {
      });

    },
  };
</script>
<style scoped lang="scss">
</style>
