<template>
  <div class="task_inside_wrap task">
    <div class="left_panel">
      <div spellcheck="false"
           contenteditable="true"
           class="title"
           @click="startEdit"
           @focusout="focusOut"
           @keypress.enter.prevent="focusOut"
           @focusin="dragDisable">
        {{item.title}}</div>
    </div>
    <div class="right_panel">
      <input type="checkbox" class="checkbox" v-model="item.completed">
    </div>
  </div>
</template>
<script>
export default {
  props: ['item'],
  data: () => {
    return {
    };
  },
  methods: {
    dragDisable(e) {
      this.$emit('dragDisable');
      e.target.focus();
      this.$forceUpdate();
    },
    focusOut(e) {
      this.item.title = e.target.innerText.trim();
      this.$store.state.TaskList.find((taskList) =>
        taskList.uID == this.item.parent).
          rewriteTask(this.item);
      e.target.blur();
      this.$emit('dragEnable');
    },
    startEdit(e) {
      e.target.blur();
      e.target.focus();
    },
  },
};
</script>
