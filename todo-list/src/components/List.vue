<template>
  <div class="container">
    <div id="todos" class="list-items">
      <template v-if="filteredItems.length > 0">
        <ListItem
          v-on:transfer-todos="transferTodos"
          v-model="filteredItems"
          :items="filteredItems"
          :handle-delete="deleteTodo"
          :handle-check="check"
        />
      </template>
      <template v-else-if="items.length">
        <ListItem
          v-on:transfer-todos="transferTodos"
          v-model="items"
          :items="items"
          :handle-delete="deleteTodo"
          :handle-check="check"
        />
      </template>
      <template v-else>
        <div class="empty-items-alert">No items were found:(. Try creating a new one!</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ListItem from '@/components/ListItem.vue';
import { Item } from '../store/interfaces';

@Component({
  components: {
    ListItem,
  },
})
export default class List extends Vue {
  get items() {
    return this.$store.state.items;
  }

  set items(items: Item[]) {
    this.$store.commit('updateItems', items);
  }

  private check(id: string) {
    this.$store.commit('updateCheckbox', id);
  }

  private deleteTodo(id: string) {
    this.$store.commit('deleteItem', id);
  }

  get filteredItems() {
    return this.$store.state.filters.filteredItems;
  }

  set filteredItems(items: Item[]) {
    this.$store.commit('updateFilteredItems', items);
  }

  private transferTodos(project: string, id: string) {
    this.$emit('transfer-todos', project, id);
  }
}
</script>

<style scoped lang="scss">
.container {
  text-align: left;
  padding-right: 45px;
}

.list-items {
  li {
    list-style: none;
    margin: 10px 0 10px 5px;
    cursor: move;
  }
}

.empty-items-alert {
  font-size: medium;
}
</style>
