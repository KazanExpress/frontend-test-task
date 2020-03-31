<template>
  <div class="text-center align-items-center">
    <div class="mb-4 row">
      <div class="col-6 col-sm-12 col-md-6 text-left">
        <div class="mb-3">
          <h1
            v-if="!isChangeName"
            @click="isChangeName = !isChangeName"
            class="cursor-pointer m-0 d-inline-block"
          >{{name}}</h1>
          <change-text
            v-else
            :text="name"
            @updateText="updateName"
            @customAction="toggleVisible"
          ></change-text>
        </div>
        <loader-output
          :filename="name"
          :format-file="formatFileForExport"
          :data="dataForExport"
        ></loader-output>
      </div>
      <div class="col-6 col-sm-12 col-md-6 text-left">
        <task-add @addTask="addTask"></task-add>
      </div>
    </div>
    <div class="row justify-content-center">
      <task-list
        @destroyTask="destroyTask"
        :taskList="taskList"
        class="col col-md-12"
      ></task-list>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * This component contains all the components that are designed to interact with the project.
 * Component is the entry point for router Project
 */

import { Component, Emit, Vue } from 'vue-property-decorator'
import store from '@/store'
import { namespace } from 'vuex-class'
import ChangeText from '@/components/project/change-text.vue'
import TaskList from '@/components/project/task-list.vue'
import TaskAdd from '@/components/project/task-add.vue'
import LoaderOutput from '@/components/loader/output.vue'
import { ITask } from '@/store/models'

const project = namespace('project')

Component.registerHooks([
  'beforeRouteEnter'
])

@Component({
  components: {
    ChangeText,
    TaskList,
    TaskAdd,
    LoaderOutput
  }
})
export default class Project extends Vue {
  @project.State
  public name!: string

  @project.State
  private taskList!: ITask[]

  private isChangeName = false
  private formatFileForExport = 'json'

  get dataForExport () {
    return JSON.stringify({ taskList: this.taskList })
  }

  @Emit('updateText')
  updateName (text: string): void {
    this.$store.commit('project/updateName', text)
  }

  @Emit('customAction')
  toggleVisible (): void {
    this.isChangeName = false
  }

  @Emit('addTask')
  addTask (task: ITask): void {
    this.taskList.unshift(task)
  }

  @Emit('destroyTask')
  destroyTask ({ index, taskList }: { index: number; taskList: ITask[] }): void {
    taskList.splice(index, 1)
  }

  async beforeRouteEnter (to: any, from: any, next: any) {
    const projectName = to.query.name
    if (typeof projectName === 'undefined') {
      next('/')
    }
    await store.dispatch('project/search', { name: projectName })
    if (store.state.project.name !== projectName) {
      next('/')
    }
    next()
  }
}
</script>

<style scoped>

</style>
