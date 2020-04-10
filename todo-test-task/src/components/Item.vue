<template>
  <div class="container">
    <label>
      <input
        type="checkbox"
        v-bind:checked="item.checked"
        @click="handleCheck(item.id)"
        class="checkbox"
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

      <span @click="transferActive = !transferActive" class="transfer-label">Transfer</span>
      <Transfer v-on:transfer-todos="transferTodos"
                v-if="transferActive"
                :id="item.id"
                label="Transfer this todo to"
      ></Transfer>

    <ul v-if="item.subitems.length > 0" class="subitems">
      <draggable v-model='item.subitems' @start="drag=true" @end="drag=false">
        <li v-for="subitem in item.subitems">
          <item :item="subitem"
                :handle-delete="handleDelete"
                :handle-check="handleCheck"
          />
        </li>
      </draggable>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IItem } from '@/interfaces/IStore';
// @ts-ignore
import draggable from 'vuedraggable';
import Transfer from '@/components/Transfer.vue';

@Component({
  components: { draggable, Transfer },
  name: 'item',
})
export default class Item extends Vue {
  @Prop() private item!: IItem;
  @Prop() private handleDelete!: Function;
  @Prop() private handleCheck!: Function;

  private transferActive = false;

  private renameItemHandler(event: Event, id: string) {
    let target = event.target as HTMLInputElement;
    this.$store.commit('renameItem', { id, name: target.value });
  }

  private addSubitem(parentid: string) {
    this.$store.commit('addSubItem', parentid);
  }

  private transferTodos(project: string, id: string) {
    this.$emit('transfer-todos', project, id);
  }
}
</script>

<style scoped lang="scss">
input {
  vertical-align: middle;
}
.item-name {
  :focus {
    outline: none;
  }

  width: 80%;
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
  cursor: pointer;
}

.subitems {
  padding-left: 10px;

  li {
    list-style: none;
    margin: 10px 0 10px 5px;
  }
}

.transfer-label {
  padding-left: 10px;
  vertical-align: middle;
}
</style>
