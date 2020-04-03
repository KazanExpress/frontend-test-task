<template>
    <div class="upload-btn-wrapper">
        <button
                type="button"
                class="btn waves-effect waves-light"
                >
            <i class="material-icons">attach_file</i>Импорт JSON
        </button>
        <input
                @change="loadingJSON($event)"
                type="file"
                name="file"
                id="file"
                accept="application/json"
        />
    </div>
</template>

<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator';
  import { IApplication, ITaskItems } from '@/interfaces/IApplication';
  import { namespace } from 'vuex-class';
  const app = namespace('app');

  @Component
  export default class ImportJSON extends Vue {

    @app.State
    public name!: string;

    @app.State
    private taskItems!: ITaskItems[];

    private async loadingJSON (event: any): Promise<void> {
      const json = event.target.files[0];
      const dataStructureJSON = {
        taskItems: this.taskItems,
      };
      if (!ImportJSON.checkFormatFile(json)) {
        this.errorMsg('Импортировать можно только JSON');
        this.fetchJson(this.name, dataStructureJSON);

        return;
      }
      const data = await this.parseJson(json);
      if (data == null) {
        this.fetchJson(this.name, dataStructureJSON);

        return;
      }
      const name = json.name.replace('.json', '');
      this.fetchJson(name, data as object);
    }

    private fetchJson (name: IApplication['name'], data: object): void {
      this.$emit('fetchJson', {
        name,
        ...data,
      });
    }

    private async parseJson (file: Blob): Promise<{taskItems: ITaskItems[]} | null > {
      try {
        const strJSON = await this.readJson(file);
        const data = JSON.parse(strJSON);
        if (!this.isValidTaskItem(data)) {
          this.errorMsg('Ошибка структуры');

          return null;
        }
        if (this.isTasksNotEmpty(data.taskItems) && !this.isValidTasks(data.taskItems)) {
          this.errorMsg('Ошибка структуры');

          return null;
        }
        return { taskItems: data.taskItems }
      } catch (error) {
        this.errorMsg('Ошибка парсинга' + error);

        return null;
      }
    }

    private static checkFormatFile (file: Blob): boolean {

      return file.type === 'application/json';
    }

    private isValidTasks (taskItems: []): boolean {
      for (let item of taskItems) {
        if (!this.checkingTask(item)) {

          return false;
        }
      }

      return true;
    }

    private errorMsg (message: string): void {
      this.$store.commit('onError', { show: true, message })
    }

    private readJson (file: Blob): Promise<string> {
      return new Promise((resolve, reject) => {
        const fileReaderAPI = new FileReader()
        fileReaderAPI.readAsText(file)
        fileReaderAPI.onload = () => {
          if (typeof fileReaderAPI.result === 'string') {
            resolve(fileReaderAPI.result)
          }
          resolve('')
        }
        fileReaderAPI.onerror = error => reject(error)
      })
    }

    public isValidTaskItem (value: IApplication): boolean {
      return value && 'taskItems' in value && Array.isArray(value.taskItems)
    }

    public isTasksNotEmpty (items: []): boolean {
      return Object.keys(items).length > 0
    }

    public checkingTask (item: ITaskItems): boolean {
      if (item) {
        return ('name' in item && true) && ('description' in item && true) && ('isChecked' in item && true) && ('enclosedTaskItem' in item && Array.isArray(item.enclosedTaskItem))
      }
      return false
    }
  }
</script>

<style scoped>
    .upload-btn-wrapper {
        /*display: none;*/
        position: relative;
        overflow: hidden;
        display: inline-block;
    }

    .upload-btn-wrapper input[type=file] {
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }

</style>
