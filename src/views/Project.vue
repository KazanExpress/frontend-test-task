<template>
  <div class="Project">
    <div class="project__title-wrapper">
      <h1
        v-if="!editTitle"
        class="project__title"
      >
        Проект:  {{ projectName }}
        <i
          class="el-icon-edit"
          @click="editTitle = true"
        />
      </h1>
      <h1
        v-else
        class="project__title"
      >
        Назовите проект
        <input
          v-model="projectName"
          @change="changeTitle"
        >
      </h1>
      <div
        v-if="!editTitle"
        class="title__search-wrapper"
      >
        <span>Поиск</span>
        <input
          v-model="searchTask"
          list="colors-list"
          @input="findTask"
        >
        <datalist id="colors-list">
          <option
            v-for="opt in searchFilter"
            :key="opt"
            :value="opt"
          />
        </datalist>

        <i
          class="el-icon-plus"
          title="Сохранить фильтр"
          @click="saveFilter"
        />
      </div>
      <div
        v-if="!editTitle"
        class="project__button-wrapper"
      >
        <label
          for="upload-json"
          class="project__btn"
        >
          Import
          <input
            id="upload-json"
            style="visibility: hidden; width: 0px"
            type="file"
            placeholder="Import"
            multiple
            @change="importProject"
          >
        </label>

        <button
          class="project__btn"
          @click="exportProject"
        >
          Export
        </button>
      </div>
    </div>
    <div
      v-if="!editTitle"
      class="project__add-task"
    >
      <span>Новая задача</span>
      <input
        v-model="newTask"
        type="text"
        @change="addNewTask"
      >
    </div>
    <div
      v-if="!editTitle"
      class="project__list"
    />
    <nestedDraggable
      v-model="tasks"
      group="people"
      @start="drag=true"
      @end="drag=false"
    >
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task.sync="task"
        @deleteTask="onDeleteHandler"
      />
    </nestedDraggable>
  </div>
</template>

<script>
// import _ from 'lodash';

import nestedDraggable from 'vuedraggable';
import Task from '../components/Task.vue';

export default {
  name: 'Project',
  components: {
    Task,
    nestedDraggable,
  },
  data() {
    return {
      projectName: '',
      editTitle: true,
      newTask: '',
      searchTask: '',
      searchFilter: [],
      tasks: [],

    };
  },
  watch: {
    tasks(value) {
      sessionStorage.setItem('tasks', JSON.stringify(value));
    },
  },
  mounted() {
    // eslint-disable-next-line no-unused-expressions
    if (window.sessionStorage.getItem('projectName')) {
      this.projectName = sessionStorage.getItem('projectName');
      this.editTitle = false;
    }
    // eslint-disable-next-line no-unused-expressions
    window.sessionStorage.getItem('searchTask').length > 0
      ? this.searchTask = sessionStorage.getItem('searchTask')
      : '';
    // eslint-disable-next-line no-unused-expressions
    window.sessionStorage.getItem('searchFilter').length > 0
      ? this.searchFilter = JSON.parse(sessionStorage.getItem('searchFilter'))
      : '';

    const tasks = JSON.parse(window.sessionStorage.getItem('tasks'));

    if (tasks) {
      this.tasks = tasks;
    }
  },
  methods: {
    changeTitle() {
      this.editTitle = false;
      document.title = this.projectName;
      sessionStorage.setItem('projectName', this.projectName);
    },
    findTask() {
      sessionStorage.setItem('searchTask', this.searchTask);
      this.$root.$emit('searchTask', this.searchTask);
    },
    addNewTask() {
      this.node += 1;
      this.tasks.push({
        id: new Date().getTime(),
        title: this.newTask,
        checked: false,
        tasks: [],
        node: this.node,
      });
      this.newTask = '';
    },
    onDeleteHandler(task) {
      const deleteItem = this.tasks.find((item) => item.id === task.id);
      this.tasks.splice(this.tasks.indexOf(deleteItem), 1);
    },
    saveFilter() {
      this.searchFilter.push(this.searchTask);
      sessionStorage.setItem('searchFilter', JSON.stringify(this.searchFilter));
      this.searchTask = '';
    },
    exportProject() {
      const data = JSON.stringify({
        projectName: this.projectName,
        tasks: this.tasks,
        search: {
          searchString: this.searchTask,
          searchFilter: this.searchFilter,
        },
      });
      const blob = new Blob([data], { type: 'text/plain' });
      const e = document.createEvent('MouseEvents');
      const a = document.createElement('a');
      a.download = `${this.projectName}.json`;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
    importProject(event) {
      const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0]);
      fileReader.onload = () => {
        const object = JSON.parse(fileReader.result);
        console.warn(object);
        console.warn(this.tasks);
        object.tasks.forEach((item) => this.tasks.push(item));
      };
    },
  },
};
</script>

<style lang="sass" scoped>
  i
    cursor: pointer
  .project__title-wrapper
    display: flex
    flex-wrap: wrap
    justify-content: space-around
    margin: 10px 0
    .project__title
      text-align: center
    .project__button-wrapper
      display: flex
      .project__btn
        width: 60px
        height: 30px
        outline: none
        border: none
        background: indigo
        color: white
        text-align: center
        font-size: 12px
        vertical-align: center
        display: flex
        justify-content: center
        align-items: center
        margin: 0 5px
        &:hover
          background: aqua

  .project__add-task
    display: flex
    justify-content: center
    align-items: center
    span
      margin-right: 10px

</style>
