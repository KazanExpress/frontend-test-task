<template>
  <form class="form" @click.prevent>
    <h3 class="form__title">Создать задачу</h3>
    <div class="form__inputs">
      <input
        v-model="name"
        class="input"
        type="text"
        placeholder="Название задачи"
      />
      <textarea
        v-model="desc"
        class="textarea"
        placeholder="Описание задачи"
      ></textarea>
    </div>
    <button class="form__btn btn" @click="createFormTask">
      Создать задачу
    </button>
  </form>
</template>

<script  lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapGetters } from 'vuex';
export default defineComponent({
  data() {
    return {
      name: '' as string,
      desc: '' as string,
    };
  },
  computed: {
    ...mapGetters(['getTaskData', 'getCurrentModal']),
  },
  methods: {
    ...mapMutations(['CREATE_TASK', 'SET_TASK_DATA', 'CLOSE_MODAL']),
    createFormTask(): void {
      this.SET_TASK_DATA({
        id:
          this.getCurrentModal == 'taskModal'
            ? null
            : this.getCurrentModal == 'subTaskModal'
            ? this.getTaskData.id
            : '',
        name: this.name,
        desc: this.desc,
      });

      this.CREATE_TASK();
      this.CLOSE_MODAL();
      this.name = '';
      this.desc = '';
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
  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__btn {
    margin-top: 10px;
  }
}
</style>