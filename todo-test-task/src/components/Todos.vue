<template>
  <div class="container">
    <CreateTodo v-on:create-todo="addTodo"></CreateTodo>
    <img src="../assets/filter.png" alt="add todo" class="icon" />
    <input
      type="text"
      placeholder="Start typing task name"
      v-on:input="filterHandler"
      :value="this.$store.state.filters.filterValue"
      class="filter-input"
    />
    <ul id="todos" class="list-items">
      <template v-if="filteredItems.length">
          <draggable v-model='filteredItems' @start="drag=true" @end="drag=false">
              <li v-for="item in filteredItems" :key="item.id">
                <Item
                  :item="item"
                  :handle-delete="deleteTodo"
                  :handle-check="check"
                />
              </li>
          </draggable>
      </template>
      <template v-else>
          <draggable v-model='items' @start="drag=true" @end="drag=false">
              <li v-for="item in items" :key="item.id">
                <Item
                  :item="item"
                  :handle-delete="deleteTodo"
                  :handle-check="check"
                />
              </li>
          </draggable>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Item from '@/components/Item.vue';
import CreateTodo from '@/components/CreateTodo.vue';
// @ts-ignore
import draggable from 'vuedraggable';
import {IItem} from '@/interfaces/IStore';

@Component({
  components: {
    Item,
    CreateTodo,
    draggable,
  },
})
export default class Todos extends Vue {
  get filteredItems() {
    return this.$store.state.filters.filteredItems;
  }

  set filteredItems(items: IItem[]) {
    this.$store.commit('updateFilteredItems', items);
  }

  get items() {
    return this.$store.state.items;
  }

  set items(items: IItem[]) {
    this.$store.commit('updateItems', items);
  }


  private filterHandler(input: Event) {
    let target = input.target as HTMLInputElement;
    this.$store.commit('changeFilter', target.value);
  }

  private addTodo(name: string) {
    this.$store.commit('addItem', name);
  }

  private deleteTodo(id: string) {
    this.$store.commit('deleteItem', id);
  }

  private check(id: string) {
    this.$store.commit('updateCheckbox', id);
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
  }
}
.filter-input {
  width: 200px;
  font-size: medium;

  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
}
.icon {
  margin-left: 45px;
  height: 15px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
