<template>
  <div class="container">
    <label>
      <input
        type="checkbox"
        v-bind:checked="item.checked"
        @click="check(index)"
      />
    </label>
    <label>
      <input type="text"
             v-bind:value="item.name"
             v-on:input="renameItemHandler($event, index)"
      />
    </label>
    <img src="../assets/bin.png" alt="delete item" @click="deleteTodo(index)" />
    <div v-if="item.subitems.length" >
      <ul v-for="(subitem, subIndex) in item.subitems" class="subitems">
<!--        <item v-if="subitem" :index="subIndex">-->
<!--        </item>-->
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {IItem} from '@/interfaces/IStore';
@Component({
  components: {},
  name: 'item'
})
export default class Item extends Vue {
  @Prop() private item!: IItem;
  @Prop() private index!: number;

  deleteTodo(index: number) {
    this.$emit("delete-todo", index);
  }

  check(index: number) {
    this.$emit("update-checkbox", index);
  }

  renameItemHandler(event: Event, index: number){
    let target = event.target as HTMLInputElement;
    console.warn(target.value, index);
    this.$store.commit("renameItem", { index, name: target.value });
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

.subitems {
  padding-left: 10px;
}
</style>
