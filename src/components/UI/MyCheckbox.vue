<template>
  <label class="checkbox">
    <input
      class="checkbox__disabled"
      type="checkbox"
      :checked="modelValue"
      @change="changeCheckbox"
    />
    <span class="checkbox__active">
      <img src="../../assets/icon-checkbox.svg" alt="" />
    </span>
    <span class="checkbox__name"><slot></slot></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    changeCheckbox(e: Event): void {
      this.$emit('update:modelValue', (e.target as HTMLInputElement).checked);
    },
  },
});
</script>

<style scoped lang="scss">
.checkbox {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  &__disabled {
    position: absolute;
    pointer-events: none;
    opacity: 0;
  }
  &__active {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 20px;
    border: 2px solid #4f4f4f;
  }
  &__active img {
    opacity: 0;
    transition: 200ms opacity;
  }
  &__disabled:checked ~ &__active img {
    opacity: 1;
  }
}
</style>