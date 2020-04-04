<template>
    <div>
        <import-j-s-o-n @fetchJson="fetchJson"></import-j-s-o-n>
        <button @click="fetchJson({ name: name, taskItems })" class="btn waves-effect waves-light">Загрузить
            <i class="material-icons right">cloud</i>
        </button>


    </div>

</template>

<script lang="ts">

  import ImportJSON from '@/components/ImportJSON.vue'
  import { Component, Emit, Vue } from 'vue-property-decorator'
  import { ITaskItems } from '@/interfaces/IApplication'
  import { namespace } from 'vuex-class'

  const tasker = namespace('tasker')
  @Component({
    components: {
      ImportJSON
    }
  })
  export default class TaskApp extends Vue {
    @tasker.State
    public name!: string

    @tasker.State
    private taskItems!: ITaskItems[]

    @Emit('fetchJson')
    fetchJson({ name, taskItems }: { name: string; taskItems: ITaskItems[] }): void {
      this.$store.commit('tasker/saveToStorage', {
        name,
        taskItems
      })
      this.$router.push({ name: 'TaskApp', query: { name: name } })
    }
  }
</script>

<style scoped>

</style>
