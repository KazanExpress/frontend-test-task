<template>
  <div class="container">
    <div class="inputContainer">
      <img src="../assets/plus.png" alt="add todo" class="icon" />
      <input
        v-model="name"
        type="text"
        placeholder="Add new task"
        @keyup.enter="addTodo"
        class="add-todo"
      />
    </div>
    <!--    <div>-->
    <!--      <button @click="addTodo">Add</button>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class CreateTodo extends Vue {
  private name = '';

  private addTodo() {
    const todoName = this.name;
    this.$emit('create-todo', todoName);
    this.name = '';
  }
}
</script>

<style scoped lang="scss">
inputContainer {
  padding: 0 10px 15px 0;
}
.container {
  width: 75%;
  padding: 0 0 15px 45px;
}
.add-todo {
  :focus {
    outline: none;
  }

  width: 200px;
  font-size: medium;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
}
.icon {
  height: 15px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
