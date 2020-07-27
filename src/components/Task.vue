<template>
  <div
    ref="taskRef"
    class="task"
  >
    <input
      v-model="task.checked"
      type="checkbox"
    >
    <input
      v-if="editTitle"
      v-model="task.title"
      @change="editTitle = false"
      @blur="editTitle = false"
    >
    <span
      v-else
      class="task__title"
    >{{ task.title }}</span>
    <i
      class="el-icon-edit"
      @click="editTitle = !editTitle"
    />
    <i
      class="el-icon-delete"
      @click="deleteTask"
    />
    <i
      class="el-icon-plus"
      @click="newSubTask"
    />
    <nestedDraggable
      v-model="task.tasks"
      group="people"
      @start="drag=true"
      @end="drag=false"
    >
      <Task
        v-for="task in task.tasks"
        :key="task.id"
        :task.sync="task"
        @deleteTask="onDeleteHandler"
      />
    </nestedDraggable>
  </div>
</template>

<script>
import nestedDraggable from 'vuedraggable';

export default {
  name: 'Task',
  components: {
    nestedDraggable,
  },
  props: {
    task: {
      type: Object,
      default: () => ({
        title: '',
        checked: false,
      }),
    },
  },
  data() {
    return {
      editTitle: false,
    };
  },
  mounted() {
    this.$root.$on('searchTask', (searchString) => {
      const taskDiv = this.$refs.taskRef;
      if (searchString.length > 0) {
        // eslint-disable-next-line no-unused-expressions
        this.task.title.includes(searchString)
          ? taskDiv.style.color = 'black'
          : taskDiv.style.color = 'wheat';
      } else {
        taskDiv.style.color = 'black';
      }
    });
  },
  beforeDestroy() {
    this.$root.$off('searchTask');
  },
  methods: {
    deleteTask() {
      this.$emit('deleteTask', this.task);
    },
    newSubTask() {
      window.console.log('aaa');
      this.task.tasks.push({
        id: new Date().getTime(),
        title: 'Новая задача',
        checked: false,
        tasks: [],
        node: this.task.node,
      });
      this.$emit('updateTask', this.task);
    },
    onDeleteHandler(task) {
      const deleteItem = this.task.tasks.find((item) => item.id === task.id);
      this.task.tasks.splice(this.task.tasks.indexOf(deleteItem), 1);
    },
  },
};
</script>

<style lang="sass" scoped>
  .task
    display: flex
    justify-content: center
    align-items: center

    border: 1px solid black
    width: fit-content
    margin: 10px auto
    *
      margin-right: 10px
    i
      cursor: pointer
</style>
