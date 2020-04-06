<template>
  <v-app>
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
      <v-btn
        icon
        class="mr-2"
        @click="search.isVisible = !search.isVisible"
      >
        <!-- background-color="rgba(0,0,0,0)" -->
        <!-- v-if="isSearchVisible" -->
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <Tasks
          :storage="store"
          :search="search"
        />
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

@Component({
  components: { Tasks },
})
export default class App extends Vue {
  store!: Store

  projectName_: string | false = false

  get projectName() {
    if (!this.projectName_) {
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

  search_: { value: string; isVisible: boolean } | null = null

  get search() {
    if (!this.search_) {
      this.store.getSearch().then((it) => {
        this.search_ = it
      })

      return { value: '', isVisible: false }
    }

    return this.search_
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
      this.store.saveSearch(this.search)
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
