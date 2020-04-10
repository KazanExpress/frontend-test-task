<template>
  <v-app class="app">
    <!-- <v-navigation-drawer app> -->
    <!-- -->
    <!-- </v-navigation-drawer> -->

    <v-app-bar
      app
      class="app-bar"
    >
      <!-- v-model="task.title" -->
      <v-spacer />
      <v-spacer />
      <v-toolbar-title>
        <v-text-field
          v-model="project.name"
          background-color="rgba(0,0,0,0)"
          class="font-weight-bold display-1"
          placeholder="Проект №1"
          dense
          flat
          hide-details
          solo
        />
      </v-toolbar-title>
      <v-spacer />
      <div class="app-bar__search">
        <v-slide-x-reverse-transition>
          <v-text-field
            v-if="project.search.isVisible"
            v-model="project.search.value"
            class="mr-10"
            placeholder="Search"
            dense
            flat
            hide-details
            solo
          />
        </v-slide-x-reverse-transition>
      </div>
      <v-btn
        icon
        class="mr-2"
        @click="project.search.isVisible = !project.search.isVisible"
      >
        <!-- background-color="rgba(0,0,0,0)" -->
        <!-- v-if="isSearchVisible" -->
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        icon
        class="mr-2"
        @click="downloadData"
      >
        <!-- background-color="rgba(0,0,0,0)" -->
        <!-- v-if="isSearchVisible" -->
        <v-icon>mdi-download</v-icon>
      </v-btn>
      <v-btn
        icon
        class="mr-2"
        @click="uploadData"
      >
        <!-- background-color="rgba(0,0,0,0)" -->
        <!-- v-if="isSearchVisible" -->
        <v-icon>mdi-upload</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content class="main-content">
      <v-container fluid>
        <Task-Group
          :sections.sync="project.sections"
          :search="project.search.isVisible ? project.search.value : ''"
          @add-task="addTask"
          @remove-task="removeTask"
          @add-column="addColumn"
        />
      </v-container>
    </v-content>

    <!-- <v-footer app> -->
    <!-- -->
    <!-- </v-footer> -->
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { nanoid } from 'nanoid'
// import Tasks from './components/Tasks/TaskList.vue'
import { ProjectStore } from './store/ProjectStore'
import { jsonToFile, readFileInput } from './utils'
import { Project } from './store/ProjectStore/Project'
import { Task } from './store/ProjectStore/Task'
import TaskGroup from './components/Tasks/TaskGroup.vue'
import { Section } from './store/ProjectStore/Section'

@Component({
  components: { TaskGroup },
})
export default class App extends Vue {
  store = new ProjectStore()

  project: Project = new Project()

  addTask(section: Section) {
    section.tasks.push(new Task())
  }

  removeTask(section: Section, task: Task) {
    section.tasks.splice(section.tasks.indexOf(task), 1)
  }

  downloadData() {
    const data = this.store.exportProjectState()

    if (!data) {
      console.error('Could not get store data')
      return
    }

    jsonToFile(data, `${this.project.title}.json`)
  }

  async uploadData() {
    const data = await readFileInput()
    if (!data) {
      console.error('Bad import data')
      return
    }
    try {
      this.project = this.store.importProjectState(data)
    } catch (err) {
      console.error('Could not import project state')
    }
  }

  addColumn() {
    this.project.sections.push(new Section())
  }

  mounted() {
    let id: string
    let project: Project | null

    if (document.location.pathname === '/') {
      id = nanoid(6)
      window.history.pushState({}, '', `/${id}`)
    } else {
      id = document.location.pathname.slice(1)
    }

    project = this.store.getProject(id)
    if (!project) {
      project = this.store.addProject({ id })
    }
    this.project = project
    this.store.setDefaultProjectId(id)

    console.log(project.sections)

    window.addEventListener(
      'beforeunload',
      this.store.saveState.bind(this.store)
    )
  }
}
</script>

<style>
:root {
  overflow-y: hidden;

}

* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}

.app-bar input {
  text-align: center;
}

.app-bar__search {
  width: 15%;
}

.main-content {
  background-color: #333333;
}

.sortable-ghost {
  border: 1px dotted green !important;
  opacity: 0.5;
}
</style>
