<template>
  <v-app>
    <!-- <v-navigation-drawer app> -->
    <!-- -->
    <!-- </v-navigation-drawer> -->

    <v-app-bar app class="app-bar">
      <!-- v-model="task.title" -->
      <v-spacer />
      <v-spacer />
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
      <v-spacer />
      <div class="app-bar__search">
        <v-slide-x-reverse-transition>
          <v-text-field
            v-if="search.isVisible"
            v-model="search.value"
            class="mr-10"
            placeholder="Search"
            dense
            flat
            hide-details
            solo
          />
        </v-slide-x-reverse-transition>
      </div>
      <v-btn icon class="mr-2" @click="search.isVisible = !search.isVisible">
        <!-- background-color="rgba(0,0,0,0)" -->
        <!-- v-if="isSearchVisible" -->
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon class="mr-2" @click="downloadData">
        <!-- background-color="rgba(0,0,0,0)" -->
        <!-- v-if="isSearchVisible" -->
        <v-icon>mdi-download</v-icon>
      </v-btn>
      <v-btn icon class="mr-2" @click="uploadData">
        <!-- background-color="rgba(0,0,0,0)" -->
        <!-- v-if="isSearchVisible" -->
        <v-icon>mdi-upload</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <Tasks ref="tasks" :store="store" :search="search" />
      </v-container>
    </v-content>

    <!-- <v-footer app> -->
    <!-- -->
    <!-- </v-footer> -->
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, ProvideReactive } from 'vue-property-decorator'
import Tasks from './components/Tasks/index.vue'
import { Store } from './store'
import { jsonToFile, readFileInput } from './utils'

import { saveStateTasks, saveState } from './globals'

@Component({
  components: { Tasks },
})
export default class App extends Vue {
  store!: Store

  projectName_: string | null = null

  search_: { value: string; isVisible: boolean } | null = null

  requestUpdate() {
    this.requestSearchUpdate()
    this.requestProjectNameUpdate()
  }

  requestProjectNameUpdate() {
    this.store.getTitle().then((it) => {
      this.projectName_ = it
    })
  }

  requestSearchUpdate() {
    this.store.getSearch().then((it) => {
      this.search_ = it
    })
  }

  get projectName() {
    if (!this.projectName_) {
      this.requestProjectNameUpdate()
      return ''
    }

    return this.projectName_
  }

  set projectName(arg) {
    this.projectName_ = arg
  }

  get search() {
    if (!this.search_) {
      this.requestSearchUpdate()
      return { value: '', isVisible: false }
    }

    return this.search_
  }

  set search(arg) {
    this.search_ = arg
  }

  downloadData() {
    saveState()
    jsonToFile(
      this.store.exportProjectState(),
      `${this.projectName}.json`,
      'application/json'
    )
  }

  async uploadData() {
    const data = await readFileInput()
    if (!data) {
      console.error('bad import data')
      return
    }
    try {
      this.store.importProjectState(data)
    } catch (err) {
      console.error('bad import data')
      return
    }

    this.requestUpdate()
    ;(this.$refs.tasks as any).requestUpdate()
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

    saveStateTasks.set('saveTitle', {
      storeFn: this.store.saveTitle.bind(this.store),
      getValue: () => this.projectName_,
    })
    saveStateTasks.set('saveSearch', {
      storeFn: this.store.saveSearch.bind(this.store),
      getValue: () => this.search_,
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

.app-bar__search {
  width: 15%;
}

.d-hidden {
  visibility: hidden;
}

.d-visible {
  visibility: visible;
}
</style>
