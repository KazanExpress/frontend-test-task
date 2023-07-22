<template>
  <form class="form">
    <h3 class="form__title">Загрузить проект</h3>
    <div class="form__import import-form">
      <input
        id="file"
        class="import-form__disabled"
        type="file"
        @change="handleFile"
      />
      <label class="import-form__active" for="file">
        <span class="import-form__active-icon">
          <img src="../assets/arrow-bar-up.svg" alt="" />
        </span>
        <span class="import-form__active-name">{{ selectedFile }}</span>
      </label>
    </div>
    <button class="form__btn btn" @click="importFile">Загрузить</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      selectedFile: 'Выберите файл' as string,
      file: null as File | null,
    };
  },
  methods: {
    handleFile(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        this.file = input.files[0];
        this.selectedFile = this.file.name;
      } else {
        this.file = null;
        this.selectedFile = 'Выберите файл';
      }
    },
    importFile(e: Event): void {
      e.preventDefault();

      if (!this.file) {
        this.selectedFile = 'Файл не выбран.';
        return;
      }
      const reader = new FileReader();

      reader.onload = function (event: ProgressEvent<FileReader>) {
        const fileContent = event.target?.result;

        if (typeof fileContent === 'string') {
          const jsonData = JSON.parse(fileContent);
          for (var key in jsonData) {
            sessionStorage.setItem(key, jsonData[key]);
          }
        }
      };
      reader.readAsText(this.file);
      window.location.reload();
    },
  },
});
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    margin-bottom: 20px;
    text-align: center;
  }
  &__btn {
    margin-top: 20px;
    max-width: 202px;
    width: 100%;
  }
}
.import-form {
  &__disabled {
    display: none;
  }
  &__active {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__active-icon,
  &__active-name {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    background: #1bbc9b;
  }
  &__active-icon {
    border-radius: 5px 0 0 5px;
  }
  &__active-icon img {
    width: 30px;
  }
  &__active-name {
    border-radius: 0 5px 5px 0;
    margin-left: 1px;
    color: #fff;
  }
}
</style>