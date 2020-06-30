<template>
  <div class="panel" v-if="tasks">
    <drop @drop="dropEndPanel" :data-taskpanelid="tasks.uID">
      <drag :data="tasks" @dragstart="dragStartPanel">
        <div class="panel_header">
          {{ tasks.uID }}
          <div>{{tasks.title}}</div>
        </div>
        <div class="task" v-for="item in tasks.tasks" :key="item.id">
          <drop @drop="dropEnd" :data-dropend="item.id" :data-droptasklist="tasks.uID">
            <drag :key="item.id" :data="item" @dragstart="dragStart" :drag-image="{opacity: 1}">
              <h2>{{item.id}}</h2>
              <div class="task_inside_wrap">
                <h2 class="title"> {{item.title}}</h2>
                <input type="checkbox" id="checkbox" v-model="item.completed">

              </div>

              <!--              <div class="completed">Complete: {{item.completed}}</div>-->
              <div>{{item.parent}}</div>

            </drag>
          </drop>

        </div>
        <div class="task new_task" @click="newTask">
          <div class="wrap">
            <PenPlus/>
          </div>


        </div>
      </drag>
    </drop>
  </div>

</template>
<script>
  import {mapGetters, mapState} from 'vuex';
  import {Drag, Drop} from 'vue-easy-dnd';
  import {Tasklist} from '../models/Tasklist';


  import PenPlus from 'vue-material-design-icons/PenPlus.vue';

  export default {
    props: {
      tasks: {},
    },
    components: {
      Drag,
      Drop,
      PenPlus,
    },
    computed: {
      ...mapState(['Todo']),
      ...mapGetters({tasksListsArr: 'getTasks'}),
    },
    data: () => {
      return {};

    },
    methods: {
      newTask() {
        this.tasks.newTask('second Task' + Date.now());
      },

      dragStart() {
        document.body.classList.add('user_select_disable');
      },
      dragStartPanel() {
        document.body.classList.add('user_select_disable');
      },
      dropEnd(e) {
        document.body.classList.remove('user_select_disable');
        if (e.data.parent && e.top.$el.getAttribute('data-droptasklist')) {
          if (e.data.parent == this.tasks.uID) {
            console.log('asdasda');
            this.tasks.sortTask(e.data.id, e.top.$el.dataset.dropend);
            this.$forceUpdate();
          } else if (e.data.parent !== this.tasks.uID && e.top.$el.dataset.dropend) {
            console.log('asdasda');
            const indexTaskListOfDragElement = this.tasksListsArr.findIndex(taskList => taskList.uID == e.data.parent);
            const indexTaskListOfDropElement = this.tasksListsArr.findIndex(
              taskList => taskList.uID == e.top.$el.dataset.droptasklist);
            this.tasksListsArr[indexTaskListOfDropElement].addTask(e.data);
            this.tasksListsArr[indexTaskListOfDragElement].deleteTask(e.data);
            this.$forceUpdate();
          }
        }
      },
      dropEndPanel(e) {

        console.log(e);
        console.log(e.top.$el);
        if (e.top.$el.getAttribute('data-taskpanelid') && e.data instanceof Tasklist) {
          document.body.classList.remove('user_select_disable');
          const indexTaskListOfDragElement = this.tasksListsArr.findIndex(taskList => taskList.id == e.data.id);
          const indexTaskListOfDropElement = this.tasksListsArr.findIndex(
            taskList => taskList.uID == e.top.$el.dataset.taskpanelid);

          console.log(indexTaskListOfDragElement);
          console.log(indexTaskListOfDropElement);

          [
            this.tasksListsArr[indexTaskListOfDragElement],
            this.tasksListsArr[indexTaskListOfDropElement]] = [
            this.tasksListsArr[indexTaskListOfDropElement],
            this.tasksListsArr[indexTaskListOfDragElement]];
          this.$emit('updateTaskPanel');

        }
      },

    },
  };
</script>
