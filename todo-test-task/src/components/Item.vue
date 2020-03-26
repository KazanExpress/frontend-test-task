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
      <input
        type="text"
        v-bind:value="item.name"
        v-on:input="renameItemHandler($event, index)"
        class="item-name"
      />
    </label>
    <img src="../assets/bin.png" alt="delete item" @click="deleteTodo(index)" />
    <div v-if="item.subitems.length">
      <ul v-for="(subitem, subIndex) in item.subitems" class="subitems">
        <!--        <item v-if="subitem" :index="subIndex">-->
        <!--        </item>-->
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IItem } from "@/interfaces/IStore";
@Component({
  components: {},
  name: "item"
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

  renameItemHandler(event: Event, index: number) {
    let target = event.target as HTMLInputElement;
    console.warn(target.value, index);
    this.$store.commit("renameItem", { index, name: target.value });
  }
}
</script>

<style scoped lang="scss">
input {
  vertical-align: middle;
}
.container {
  width: 60%;
  height: 40px;
  -webkit-box-shadow: 0 -0 15px -11px #262626;
  -moz-box-shadow: 0 -0 15px -11px #262626;
  box-shadow: 0 -0 15px -11px #262626;
}
.item-name {
  :focus {
    outline: none;
  }

  width: 90%;
  font-size: medium;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
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
