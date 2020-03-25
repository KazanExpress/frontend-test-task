<template>
    <div class="container">
        <CreateTodo v-on:create-todo="addTodo"></CreateTodo>
        <ul id="todos" class="list-items">
            <li v-for="(item, index) in items()" :key="item.name">
                <Item
                        v-bind:index="index"
                        v-on:delete-todo="deleteTodo"
                        v-on:update-checkbox="check"></Item>
            </li>
        </ul>
    </div>

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Item from "@/components/Item.vue";
  import CreateTodo from '@/components/CreateTodo.vue';

  @Component({
    components: {
      Item,
      CreateTodo,
    }
  })
  export default class Todos extends Vue {
    items() {
      return this.$store.state.items;
    }

    addTodo(name: string){
      this.$store.commit('addItem', name);
    }

    deleteTodo(index: number) {
      this.$store.commit('deleteItem', index);
    }

    check(index: number) {
      this.$store.commit('updateCheckbox', index);
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

</style >
