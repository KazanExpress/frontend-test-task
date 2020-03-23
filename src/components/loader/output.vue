<template>
  <button type="button" class="btn btn-success btn-sm" @click="generateFileForDownload">Export</button>
</template>

<script lang="ts">
/**
 * This component is designed to generate files.
 * File structure you can find in the file /src/store/models.d.ts [IProject, ITask]
 * @param {String} filename
 * @param {String} formatFile
 * @param {String} data
 *
 */
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Input extends Vue {
  @Prop({ required: true, type: String })
  private filename!: string

  @Prop({ required: true, type: String })
  private formatFile!: string

  @Prop({ required: true, type: String })
  private data!: string

  public generateFileForDownload () {
    const data = this.data
    const file = `${this.filename}.${this.formatFile}`
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
