<template>
  <div class="container">
    <CreateTodo v-on:create-todo="addTodo"></CreateTodo>
    <input
      type="text"
      placeholder="Type task name"
      v-on:input="filterHandler"
      :value="this.$store.state.filters.filterValue"
      class="filter-input"
    />
    <ul id="todos" class="list-items">
      <template v-if="filteredItems().length">
        <li v-for="(item, index) in filteredItems()" :key="index">
          <Item
            v-bind:index="index"
            v-bind:item="item"
            v-on:delete-todo="deleteTodo"
            v-on:update-checkbox="check"
          />
        </li>
      </template>
      <template v-else>
        <li v-for="(item, index) in items()" :key="index">
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
import { Component, Vue } from "vue-property-decorator";
import Item from "@/components/Item.vue";
import CreateTodo from "@/components/CreateTodo.vue";

@Component({
  components: {
    Item,
    CreateTodo
  }
})
export default class Todos extends Vue {
  filteredItems() {
    return this.$store.state.filters.filteredItems;
  }

  items() {
    return this.$store.state.items;
  }

  filterHandler(input: Event) {
    let target = input.target as HTMLInputElement;
    this.$store.commit("changeFilter", target.value);
  }

  addTodo(name: string) {
    this.$store.commit("addItem", name);
  }

  deleteTodo(index: number) {
    this.$store.commit("deleteItem", index);
  }

  check(index: number) {
    this.$store.commit("updateCheckbox", index);
  }
}
</script>

<style scoped lang="scss">
.container {
  text-align: left;
}
.list-items {
  li {
    list-style: none;
  }
}
.filter-input {
  margin-left: 40px;
}
</style>
