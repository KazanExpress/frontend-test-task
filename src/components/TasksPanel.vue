<template>
  <div class="panel" @mousedown="clickPanel" v-if="tasks">
    <div class="panel_header">
      <div>{{tasks.title}}</div>
      <div class="button_wrap">
        <button @click="newTask">Новая задача</button>
        <button @click="newTaskList">Новая список</button>

      </div>

    </div>
    <div class="task" v-for="item in tasks.tasks" :key="item.id">
      <h2>{{item.id}}</h2>
      <div class="title"> {{item.title}}</div>
      <div class="completed">Complete: {{item.completed}}</div>
    </div>
  </div>

</template>
<script>
  import {mapState} from 'vuex';

  export default {
    props: {
      tasks: {},
    },
    computed: {
      ...mapState(['Todo']),
    },
    data: () => {
      return {};
    },
    methods: {
      newTask () {
        this.tasks.newTask('second Task')
      },
      newTaskList(){
        this.$store.commit('addTaskListMutation')
      },
      clickPanel(e){
        console.dir(e.target);
        window.onmousemove = (event) =>{
          console.log(event.pageX);
          console.log(event.pageY);

        }

        window.onmouseup = (ev) =>{
          window.onmousemove = null
          console.log(ev);
        }

      }

    },


  };
</script>
