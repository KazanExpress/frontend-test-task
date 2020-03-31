<template>
  <div>
    <input-loader @fetchFile="fetchFile"></input-loader>
    <button class="btn btn-success" @click="fetchFile({ fileName: name, taskList })">Or continue without downloading</button>
  </div>
</template>

<script lang="ts">
/**
 * This component contains all the components that are designed to interact with the file project.
 * After the file is upload or the user selects interaction without a file, then the application will go to the project page
 * Component is the entry point for router Uploader
 */
import InputLoader from '@/components/loader/input.vue'
import { Component, Emit, Vue } from 'vue-property-decorator'
import { ITask } from '@/store/models'
import { namespace } from 'vuex-class'

const project = namespace('project')
@Component({
  components: {
    InputLoader
  }
})
export default class Uploader extends Vue {
  @project.State
  public name!: string

  @project.State
  private taskList!: ITask[]

  @Emit('fetchFile')
  fetchFile ({ fileName, taskList }: { fileName: string; taskList: ITask[] }): void {
    this.$store.commit('project/saveToStorage', {
      name: fileName,
      taskList
    })
    this.$router.push({ name: 'Project', query: { name: fileName } })
  }
}
</script>

<style scoped>

</style>
