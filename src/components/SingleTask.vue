<template>
  <div class="task_inside_wrap task">
    <div class="left_panel">
      <div class="title" spellcheck="false"  contenteditable="true"  @focusout="focusOut" @keypress.enter.prevent="focusOut" @focusin="dragDisable">{{item.title}}</div>
    </div>

    <div class="right_panel">
      <input type="checkbox" class="checkbox" v-model="item.completed">
    </div>
<!--    <PenPlus @click="isEditable = !isEditable"/>-->
  </div>
</template>
<script>
  import PenPlus from 'vue-material-design-icons/PenPlus.vue';
  export default {
    props: ['item'],
    components: {
      PenPlus
    },
    data: () => {
      return {
      };

    },
    methods:{
      dragDisable(e){
        this.$emit('dragDisable')
      },
      focusOut(e){
        this.item.title = e.target.innerText.trim()
        this.$store.state.TaskList.find(taskList => taskList.uID == this.item.parent).rewriteTask(this.item);
        e.target.blur()
        this.$emit('dragEnable')

      }
    }
  };
</script>
