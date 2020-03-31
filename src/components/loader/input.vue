<template>
  <div class="uploader__title">
    <input @change="loadFile($event)" type="file" name="file" id="file" class="inputFile" :accept="projectFormat"/>
    <p>Upload a <label  class="text-primary text-decoration" for="file">JSON</label> format project file</p>
  </div>
</template>

<script lang="ts">
/**
 * This component is designed to load custom files, supported file format - JSON
 * After the file is upload, the file structure will be checked,and if structure is not a valid, an error will appear
 * File structure you can find in the file /src/store/models.d.ts [IProject, ITask]
 *
 */

import { Component, Vue } from 'vue-property-decorator'
import { IProject, ITask } from '@/store/models.d.ts'
import { namespace } from 'vuex-class'
const project = namespace('project')

@Component
export default class Input extends Vue {
  private readonly projectFormat = 'application/json'
  private readonly fileFormat = 'json'
  @project.State
  public name!: string

  @project.State
  private taskList!: ITask[]

  private async loadFile (e: any): Promise<void> {
    const file = e.target.files[0]
    const defaultData = { taskList: this.taskList }
    if (!this.checkFormatFile(file)) {
      this.throwError(`Invalid file format, try ${this.fileFormat.toUpperCase()}`)
      this.fetchFile(this.name, defaultData)
      return
    }
    const data = await this.parseFile(file)
    if (data == null) {
      this.fetchFile(this.name, defaultData)
      return
    }
    const fileName = file.name.replace(`.${this.fileFormat}`, '')
    this.fetchFile(fileName, data as object)
  }

  private fetchFile (fileName: IProject['name'], data: object): void {
    this.$emit('fetchFile', {
      fileName,
      ...data
    })
  }

  private async parseFile (file: Blob): Promise<{taskList: ITask[]} | null> {
    try {
      const jsonString = await this.readFile(file)
      const data = JSON.parse(jsonString)
      if (!this.checkValidTaskList(data)) {
        this.throwError('Invalid structure')
        return null
      }
      if (this.isHasTasks(data.taskList) && !this.isValidTasks(data.taskList)) {
        this.throwError('Invalid structure')
        return null
      }
      return { taskList: data.taskList }
    } catch (e) {
      console.error(e)
      this.throwError('Failed to parse JSON file, please check correct structure')
      return null
    }
  }

  private checkFormatFile (file: Blob): boolean {
    return file.type === this.projectFormat
  }

  private isValidTasks (taskList: []): boolean {
    for (const task of taskList) {
      if (!this.checkTask(task)) {
        return false
      }
    }
    return true
  }

  private throwError (message: string): void {
    this.$store.commit('toggleError', { show: true, message })
  }

  private readFile (file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        }
        resolve('')
      }
      reader.onerror = error => reject(error)
    })
  }

  public checkValidTaskList (arg: IProject): boolean {
    return arg && 'taskList' in arg && Array.isArray(arg.taskList)
  }

  public isHasTasks (list: []): boolean {
    return Object.keys(list).length > 0
  }

  public checkTask (task: ITask): boolean {
    if (task) {
      return ('name' in task && typeof task.name === 'string') &&
        ('description' in task && typeof task.description === 'string') &&
        ('mark' in task && typeof task.mark === 'boolean') &&
        ('nestedTasks' in task && Array.isArray(task.nestedTasks))
    }
    return false
  }
}
</script>

<style scoped>
  .inputFile {
    display: none;
  }
  .inputFile + label {
    font-size: 1.25em;
    font-weight: 600;
    display: inline-block;
  }
  .uploader__title {
    /*position: absolute;*/
    /*display: inline-block;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 50%;*/
    /*transform: translateY(-50%);*/
  }
  .uploader__title label {
    cursor: pointer;
  }
</style>
