<template>
  <v-app>
    <!-- <v-navigation-drawer app> -->
    <!-- -->
    <!-- </v-navigation-drawer> -->

    <v-app-bar app class="app-bar">
      <!-- v-model="task.title" -->
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <v-text-field
          v-model="projectName"
          background-color="rgba(0,0,0,0)"
          class="font-weight-bold display-1"
          placeholder="Проект №1"
          dense
          flat
          hide-details
          solo
        />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon class="mr-2">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <!-- <router-view></router-view> -->
        <Tasks :storage="store" />
      </v-container>
    </v-content>

    <!-- <v-footer app> -->
    <!-- -->
    <!-- </v-footer> -->
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tasks from './components/Tasks/index.vue'
import { Store } from './store'

@Component({
  components: { Tasks },
})
export default class App extends Vue {
  store!: Store

  projectName_: string | false = false

  get projectName() {
    if (this.projectName_ === false) {
      this.store.getTitle().then((it) => {
        this.projectName_ = it
      })
      return ''
    }

    return this.projectName_
  }

  set projectName(arg) {
    this.projectName_ = arg
  }

  beforeCreate() {
    let id = 0

    // #todo>refactor>
    const projects = window.sessionStorage.getItem('projects')

    if (document.location.pathname === '/' && projects) {
      id = JSON.parse(projects).length
      window.history.pushState({}, '', `/${id}`)
    } else {
      id = +document.location.pathname.slice(1)
    }

    this.store = new Store(id)

    window.addEventListener('beforeunload', () => {
      this.store.saveTitle(this.projectName_ as string)
    })
  }
}
</script>

<style>
:root {
}

* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

.app-bar input {
  text-align: center;
}
</style>
