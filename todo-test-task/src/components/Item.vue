<template>
    <div class="container">
        <label>
            <input type="radio" v-model="item.checked">
        </label>
        <label>
            <input type="text" v-model="item.name">
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
    @Prop() private item!: object;
    @Prop() private index!: number;

    deleteTodo(index: number){
      this.$emit('delete-todo', index);
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
