<template>
  <draggable
    ghost-class="ghost"
    :list="items"
    @input="emitter"
    :value="value"
    :options="{group:{name:'todos',pull:true,put:true},animation: 150}"
    @end="handleDrop"
  >
    <div class="item" v-for="item in realValue" :key="item.id">
      <div class="content">
        <input
          type="checkbox"
          v-bind:checked="item.checked"
          @click="handleCheck(item.id)"
          class="checkbox"
        />
        <input
          type="text"
          v-bind:value="item.name"
          v-on:input="renameItemHandler($event, item.id)"
          class="item-name"
        />
        <img src="@/assets/plus.png" alt="add subitem" @click="addSubitem(item.id)" />
        <img src="@/assets/bin.png" alt="delete item" @click="handleDelete(item.id)" />
        <img
          src="@/assets/transfer.png"
          @click="transferActive = {...transferActive, [item.id]: !transferActive[item.id]}"
          class="transfer-icon"
          alt="transfer items"
        />
        <Transfer
          v-on:transfer-todos="transferTodos"
          v-if="transferActive[item.id]"
          :id="item.id"
          label="Transfer this todo to"
        />
      </div>
      <item :items="item.subitems" :handle-delete="handleDelete" :handle-check="handleCheck" />
    </div>
  </draggable>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Item } from '../store/interfaces';
import draggable from 'vuedraggable';
import Transfer from '@/components/Transfer.vue';

@Component({
  components: { draggable, Transfer },
  name: 'item',
  methods: {
    emitter(value) {
      this.$emit('input', value);
    },
  },
})
export default class ListItem extends Vue {
  @Prop() private items!: Item;
  @Prop() private value!: Item;

  @Prop() private handleDelete!: Function;
  @Prop() private handleCheck!: Function;

  private transferActive = {};

  private renameItemHandler(event: Event, id: string) {
    let target = event.target as HTMLInputElement;
    this.$store.commit('renameItem', { id, name: target.value });
  }
  get realValue() {
    return this.value ? this.value : this.items;
  }
  private addSubitem(parentid: string) {
    this.$store.commit('addSubItem', parentid);
  }

  private handleDrop() {
    this.$store.commit('updateStorage');
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
.item {
  padding: 5px;
  margin: 0px 0px 10px 15px;
  border: 1px solid;
  border-color: rgba(128, 128, 128, 0.5);
}

.item-name {
  width: 90%;
  font-size: medium;
  border: none;
}
img {
  height: 15px;
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
}

.item-name:focus {
  outline: none;
}

.content {
  margin: 10px 0px;
}

.transfer-label {
  padding-left: 10px;
  vertical-align: middle;
}

.checkbox {
  margin: 0px 15px;
}

.ghost {
  opacity: 0.3;
  background: rgba(128, 128, 128, 0.5);
}
</style>
