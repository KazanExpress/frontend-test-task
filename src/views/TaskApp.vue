<template>
    <div>
        <input-loader @fetchJson="fetchJson"></input-loader>
        <button @click="fetchJson({ name: name, taskItems })" class="btn waves-effect waves-light">Загрузить
            <i class="material-icons right">cloud</i>
        </button>
    </div>
</template>

<script lang="ts">

  import ImportJSON from '@/components/ImportJSON.vue'
  import { Component, Emit, Vue } from 'vue-property-decorator'
  import { ITaskItems } from '@/interfaces/IApplication.d'
  import { namespace } from 'vuex-class'

  const app = namespace('app')
  @Component({
    components: {
      ImportJSON
    }
  })
  export default class TaskApp extends Vue {
    @app.State
    public name!: string

    @app.State
    private taskItems!: ITaskItems[]

    @Emit('fetchJson')
    fetchJson({ name, taskItems }: { name: string; taskItems: ITaskItems[] }): void {
      this.$store.commit('app/saveToStorage', {
        name,
        taskItems
      })
      this.$router.push({ name: 'TaskApp', query: { name: name } })
    }
  }
</script>

<style scoped>

</style>
