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
      <ul v-if="item.subitems.length > 0" class="subitems">
        <li v-for="(subitem, subIndex) in item.subitems">
          <item :item="subitem" :index="subIndex"/>
        </li>
      </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IItem } from '@/interfaces/IStore';

@Component({
  components: {},
  name: 'item',
})
export default class Item extends Vue {
  @Prop() private item!: IItem;
  @Prop() private index!: number;

  private deleteTodo(index: number) {
    this.$emit('delete-todo', index);
  }

  private check(index: number) {
    this.$emit('update-checkbox', index);
  }

  private renameItemHandler(event: Event, index: number) {
    let target = event.target as HTMLInputElement;
    console.warn(target.value, index);
    this.$store.commit('renameItem', { index, name: target.value });
  }
}
</script>

<style scoped lang="scss">
input {
  vertical-align: middle;
}
.container {}
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

  li {
    list-style: none;
    margin: 10px 0 10px 5px;
  }
}
</style>
