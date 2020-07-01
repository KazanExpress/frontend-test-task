<template>
  <div>
  <div class="taskscomponent_wrap">
        <TasksPanel :tasks="taskList" v-for="taskList in tasks" :key="taskList.uID"  @updateTaskPanel="doUpdate">
        </TasksPanel>
        <div class="panel panel_new" @click="$modal.show('NewListmodal')">
          <div class="panel_header panel_header_new">
            New list
          </div>

          <ModalNewTask :uIDTaskList="'NewList'" @addNew="newTaskList" :headertext="'Новая список'"/>

        </div>

  </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import TasksPanel from './TasksPanel';
  import ModalNewTask from './ModalNewTask';
  export default {
    components: {
      TasksPanel,
      ModalNewTask
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
      newTaskList(e) {
        console.log(e);
        this.$store.commit('addTaskListMutation', ['', e]);
        this.$modal.hide('NewListmodal')

      },
    }
  };
</script>
