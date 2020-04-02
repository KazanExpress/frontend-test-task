<template>
    <div>
        <input-loader @fetchFile="fetchFile"></input-loader>
        <button @click="fetchFile({ fileName: name, taskItems })" class="btn waves-effect waves-light">Загрузить
            <i class="material-icons right">cloud</i>
        </button>
    </div>
</template>

<script lang="ts">

  import InputLoader from '@/components/loader/input.vue'
  import { Component, Emit, Vue } from 'vue-property-decorator'
  import { ITaskItems } from '@/interfaces/IApplication.d'
  import { namespace } from 'vuex-class'

  const app = namespace('app')
  @Component({
    components: {
      InputLoader
    }
  })
  export default class Uploader extends Vue {
    @app.State
    public name!: string

    @app.State
    private taskItems!: ITaskItems[]

    @Emit('fetchFile')
    fetchFile ({ fileName, taskItems }: { fileName: string; taskItems: ITaskItems[] }): void {
      this.$store.commit('project/saveToStorage', {
        name: fileName,
        taskItems
      })
      this.$router.push({ name: 'TaskApp', query: { name: fileName } })
    }
  }
</script>

<style scoped>

</style>
