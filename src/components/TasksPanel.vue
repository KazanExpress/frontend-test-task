<template>
  <div class="panel" v-if="tasks">
    <drop @drop="dropEndPanel" :data-taskpanelid="tasks.uID">
      <drag :data="tasks">
        <div class="panel_header">
          <div>{{tasks.title | capitalize}}</div>
          <div class="date">от {{ tasks.uID | toDate}} </div>
        </div>
      </drag>
        <div  v-for="item in tasks.tasks" :key="item.id">
          <drop @drop="dropEnd"
                :data-dropend="item.id"
                :data-droptasklist="tasks.uID"
                v-show="filtered(item.title)">
            <drag :key="item.id"
                  :data="item"
                  :disabled="dragDisable"
                  :drag-image="{opacity: 1}">
              <SingleTask :item="item"
                          @dragDisable="dragDisable = true"
                          @dragEnable="dragDisable = false">
              </SingleTask>
            </drag>
          </drop>

        </div>
        <div class="task new_task" @click="showModalNewTask">
          <div class="wrap">
            <PenPlus/>
          </div>
        </div>

    </drop>
    <ModalNewTask
      :uIDTaskList="tasks.uID"
      @addNew="addNewTask"
      :headertext="'Новая задача'"
    />
  </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex';
import {Drag, Drop} from 'vue-easy-dnd';
import {Tasklist} from '../models/Tasklist';
import SingleTask from './SingleTask';
import PenPlus from 'vue-material-design-icons/PenPlus.vue';
import ModalNewTask from './ModalNewTask';

export default {
  props: {
    tasks: {},
  },
  components: {
    Drag,
    Drop,
    PenPlus,
    ModalNewTask,
    SingleTask,
  },
  computed: {
    ...mapState(['Todo', 'activeFilter']),
    ...mapGetters({tasksListsArr: 'getTasks'}),
  },
  data: () => {
    return {
      dragDisable: false,
    };
  },
  methods: {
    dropEnd(e) {
      if (e.data.parent && e.top.$el.getAttribute('data-droptasklist')) {
        if (e.data.parent == this.tasks.uID) {
          this.tasks.sortTask(e.data.id, e.top.$el.dataset.dropend);
          this.$forceUpdate();
        } else if
        (e.data.parent !== this.tasks.uID && e.top.$el.dataset.dropend) {
          const indexTaskListOfDragElement =
            this.tasksListsArr.findIndex((taskList) =>
              taskList.uID == e.data.parent);
          const indexTaskListOfDropElement =
            this.tasksListsArr.findIndex(
                (taskList) =>
                  taskList.uID == e.top.$el.dataset.droptasklist);
          this.tasksListsArr[indexTaskListOfDropElement].addTask(e.data);
          this.tasksListsArr[indexTaskListOfDragElement].deleteTask(e.data);
          this.$forceUpdate();
        }
      }
    },
    dropEndPanel(e) {
      const TaskListPanelEl = e.top.$el.getAttribute('data-taskpanelid');
      const isInstanceTaskList = e.data instanceof Tasklist;
      if (TaskListPanelEl && isInstanceTaskList) {
        const indexTaskListOfDragElement =
          this.tasksListsArr.findIndex((taskList) =>
            taskList.uID == e.data.uID);
        const indexTaskListOfDropElement =
          this.tasksListsArr.findIndex(
              (taskList) =>
                taskList.uID == e.top.$el.dataset.taskpanelid);
        const tempAr = this.tasksListsArr[indexTaskListOfDragElement];
        this.tasksListsArr[indexTaskListOfDragElement] =
          this.tasksListsArr[indexTaskListOfDropElement];
        this.tasksListsArr[indexTaskListOfDropElement] = tempAr;
        this.$emit('updateTaskPanel');
      }
    },
    showModalNewTask() {
      this.$modal.show(this.tasks.uID+'modal');
    },
    addNewTask(e) {
      this.$modal.hide(this.tasks.uID+'modal');
      this.tasks.newTask(e);
    },
    filtered(titleTask) {
      return titleTask.includes(this.activeFilter);
    },
  },
};
</script>


