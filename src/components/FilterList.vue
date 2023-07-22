<template>
  <ul class="list">
    <li
      v-for="(item, i) in filters"
      :key="i"
      class="item"
      @click="applyFilter(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
interface filter {
  name: string;
  dropdownSort: string;
  searchQuery: string;
}
export default defineComponent({
  props: {
    filters: {
      type: Array as () => filter[],
      default: () => [],
    },
  },
  emits: ['apply-filter'],
  methods: {
    applyFilter(item: filter) {
      this.$emit('apply-filter', {
        dropdownSort: item.dropdownSort,
        searchQuery: item.searchQuery,
      });
    },
  },
});
</script>

<style scoped lang="scss">
.list {
  display: flex;
  align-items: center;
  gap: 20px;
}
.item {
  padding: 10px;
  background: #525252;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: 200ms opacity;
}
.item:hover {
  opacity: 0.8;
}
</style>