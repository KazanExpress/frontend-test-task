<template>
  <div class="container">
    <label>
      <input
        type="checkbox"
        v-bind:checked="item.checked"
        @click="handleCheck(item.id)"
      />
    </label>
    <label>
      <input
        type="text"
        v-bind:value="item.name"
        v-on:input="renameItemHandler($event, item.id)"
        class="item-name"
      />
    </label>
    <img src="../assets/bin.png" alt="delete item" @click="handleDelete(item.id)" />
    <img src="../assets/plus.png" alt="add subitem" @click="addSubitem(item.id)">
    <ul v-if="item.subitems.length > 0" class="subitems">
        <li v-for="subitem in item.subitems">
          <item :item="subitem"
                :handle-delete="handleDelete"
                :handle-check="handleCheck"
          />
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
  @Prop() handleDelete!: Function;
  @Prop() handleCheck!: Function;

  private renameItemHandler(event: Event, id: string) {
    let target = event.target as HTMLInputElement;
    this.$store.commit('renameItem', { id, name: target.value });
  }

  private addSubitem(parentid: string) {
    this.$store.commit('addSubItem', parentid);
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
