<template>
    <div class="container">
        <label>
            <input type="checkbox" v-bind:checked="item(index).checked" @click="check(index)">
        </label>
        <label>
            <input type="text" v-bind:value="item(index).name">
        </label>
        <img src="../assets/bin.png" alt="delete item" @click="deleteTodo(index)">
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  @Component({
    components: {
    }
  })
  export default class Item extends Vue {
    @Prop() private index!: number;

    item(index: number){
      return this.$store.state.items[index];
    }
    deleteTodo(index: number){
      this.$emit('delete-todo', index);
    }

    check(index: number) {
      this.$emit('update-checkbox', index);
    }
  }
</script>

<style scoped lang="scss">
    .container {
        height: 25px;
    }

    img {
        height: 15px;
        vertical-align: middle;
        margin-left: 5px;
    }

</style>
