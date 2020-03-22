<template>
    <div class="container">
        <CreateTodo v-on:create-todo="addTodo"></CreateTodo>
        <ul id="todos" class="list-items">
            <li v-for="(item, index) in items" :key="item.name">
                <Item v-bind:item="item" v-bind:index="index" v-on:delete-todo="deleteTodo"></Item>
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
    items = [
      {checked: false, name: 'Buy tomatoes'},
      {checked: false, name: 'Buy pepper'},
      {checked: true, name: 'Wash hands'},
      {checked: false, name: 'Stay home'},
    ];

    addTodo(name: string){
      this.items.push({checked: false, name})
    }

    deleteTodo(index: number) {
      this.items.splice(index, 1);
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
