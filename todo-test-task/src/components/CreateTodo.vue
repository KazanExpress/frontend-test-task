<template>
    <div class="container">
        <label>
            <input v-model="name" type="text" placeholder="Add new task">
        </label>
        <button @click="addTodo">Add</button>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({
    components: {
    }
  })
  export default class CreateTodo extends Vue {
    name = '';

    addTodo() {
      const todoName = this.name;
      this.$emit('create-todo', todoName);
      this.name = '';
    }
  }
</script>

<style scoped lang="scss">
   .container {
       padding-left: 40px;
   }

</style >
