<template>
    <div class="input-group input-group-lg col-12 p-0">
        <input v-model="descriptionText" type="text" class="form-control">
        <div class="input-group-append">
            <button type="button" class="btn btn-success input-group-text" @click="$emit('saveEmitter')">Save</button>
        </div>
    </div>
</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class AddDescription extends Vue {
    @Prop({ type: String, required: true })
    private text!: string;

    get descriptionText () {
      return this.text;
    }

    set descriptionText (value) {
      this.$emit('updateTaskDescription', value);
    }
  }
</script>

<style scoped>

</style>
