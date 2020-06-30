<template>
  <div>
  <div class="taskscomponent_wrap">
        <TasksPanel :tasks="taskList" v-for="taskList in tasks" :key="taskList.uID" @updateTaskPanel="doUpdate">
        </TasksPanel>
        <div class="panel panel_new">
          <div class="panel_header panel_header_new" @click="newTaskList">
            New list
          </div>

        </div>

  </div>
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
    },
    methods: {
      doUpdate (){
        this.$forceUpdate()
      },
      newTaskList() {
        this.$store.commit('addTaskListMutation');
      },
    }
  };
</script>
