<template>
  <form class="form" @click.prevent>
    <h3
      class="form__title"
      v-text="
        getCurrentModal == 'titleModal'
          ? 'Изменить заголовок'
          : getCurrentModal == 'taskTitleModal'
          ? 'Изменить название задачи'
          : ''
      "
    ></h3>
    <div class="form__input">
      <input
        v-model="title"
        class="input"
        type="text"
        :placeholder="
          getCurrentModal == 'titleModal'
            ? 'Введите заголовок'
            : getCurrentModal == 'taskTitleModal'
            ? 'Введите название задачи'
            : ''
        "
      />
    </div>
    <button class="form__btn btn" @click="changeTitle">Изменить</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapGetters } from 'vuex';

export default defineComponent({
  data() {
    return {
      title: '' as string,
    };
  },
  computed: {
    ...mapGetters(['getCurrentModal', 'getTaskData']),
  },
  methods: {
    ...mapMutations([
      'SET_TITLE',
      'CLOSE_MODAL',
      'SET_TASK_DATA',
      'UPDATE_TASK_NAME',
    ]),
    changeTitle(): void {
      if (this.getCurrentModal == 'titleModal') {
        this.SET_TITLE(this.title);
        this.CLOSE_MODAL();
        this.title = '';
      } else if (this.getCurrentModal == 'taskTitleModal') {
        this.SET_TASK_DATA({
          id: this.getTaskData.id,
          level: this.getTaskData.level,
          name: this.title,
        }),
          this.UPDATE_TASK_NAME();
        this.CLOSE_MODAL();
        this.title = '';
      }
    },
  },
});
</script>

<style scoped lang="scss">
.form {
  &__title {
    margin-bottom: 20px;
    text-align: center;
  }
  &__btn {
    margin-top: 20px;
  }
}
</style>