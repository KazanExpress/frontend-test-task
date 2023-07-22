<template>
  <button class="btn" @click="downloadProject">Скачать проект</button>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
export default defineComponent({
  computed: {
    ...mapGetters(['getTitle']),
  },
  methods: {
    downloadProject(): void {
      const exportedData = JSON.stringify(sessionStorage);

      const url = URL.createObjectURL(
        new Blob([exportedData], { type: 'application/json' })
      );

      const link = document.createElement('a');
      link.href = url;
      link.download = `${this.getTitle.length ? this.getTitle : 'empty'}.json`;
      link.click();

      URL.revokeObjectURL(url);
    },
  },
});
</script>

<style scoped lang="scss">
</style>