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
          <li v-for="(item, index) in filteredItems" :key="index">
            <Item
              v-bind:index="index"
              v-bind:item="item"
              v-on:delete-todo="deleteTodo"
              v-on:update-checkbox="check"
            />
          </li>
      </template>
      <template v-else>
          <li v-for="(item, index) in items" :key="index">
            <Item
              v-bind:index="index"
              v-bind:item="item"
              v-on:delete-todo="deleteTodo"
              v-on:update-checkbox="check"
            />
          </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Item from '@/components/Item.vue';
import CreateTodo from '@/components/CreateTodo.vue';

@Component({
  components: {
    Item,
    CreateTodo,
  },
})
export default class Todos extends Vue {
  get filteredItems() {
    return this.$store.state.filters.filteredItems;
  }

  get items() {
    return this.$store.state.items;
  }

  private filterHandler(input: Event) {
    let target = input.target as HTMLInputElement;
    this.$store.commit('changeFilter', target.value);
  }

  private addTodo(name: string) {
    this.$store.commit('addItem', name);
  }

  private deleteTodo(id: string) {
    console.warn("got delete todo");
    this.$store.commit('deleteItem', id);
  }

  private check(index: number) {
    this.$store.commit('updateCheckbox', index);
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
