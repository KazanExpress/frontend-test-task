<template>
    <button type="button" class="btn waves-effect waves-light" @click="exportJSON">Export JSON
        <i class="material-icons right">send</i>
    </button>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class ImportJSON extends Vue {
    @Prop({ required: true, type: String })
    private name!: string
    @Prop({ required: true, type: String })
    private data!: string

    public exportJSON () {
      const data = this.data
      const file = `${this.name}.json`
      const blob = new Blob([data])
      if (!window.navigator.msSaveOrOpenBlob) {
        const a = window.document.createElement('a')
        a.href = window.URL.createObjectURL(blob)
        a.download = file
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } else {
        window.navigator.msSaveBlob(blob, file)
      }
    }
  }
</script>

<style scoped>

</style>
