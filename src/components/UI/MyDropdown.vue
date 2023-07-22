<template>
  <div class="dropdown">
    <div class="dropdown__hero" :class="{ active: show }" @click="show = !show">
      {{ modelValue.length ? activeOption : 'Выберите фильтр' }}
      <img src="../../assets/caret-down-fill.svg" alt="" />
    </div>
    <transition name="animate">
      <ul v-if="show" class="dropdown__list">
        <li
          class="dropdown__item"
          :class="{ disabled: !modelValue.length }"
          @click="changeOption({ name: '', value: '' })"
        >
          Выберите фильтр
        </li>
        <li
          v-for="option in options"
          :key="option.value"
          class="dropdown__item"
          :class="{ disabled: option.name == activeOption }"
          @click="changeOption(option)"
        >
          {{ option.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
interface Option {
  name: string;
  value: string;
}
export default defineComponent({
  props: {
    options: {
      type: Array as () => Option[],
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      show: false as boolean,
      activeOption: '' as string,
    };
  },
  watch: {
    modelValue(newValue): void {
      if (!newValue.length) {
        this.activeOption = '';
      } else {
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].value === newValue) {
            this.activeOption = this.options[i].name;
          }
        }
      }
    },
  },
  methods: {
    changeOption(option: Option): void {
      this.$emit('update:modelValue', option.value);
      this.show = !this.show;
    },
  },
});
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;
  z-index: 10;
  cursor: pointer;
  &__hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 45px;
    border: 2px solid#323232;
    background: #fff;
    border-radius: 5px;
  }
  &__hero img {
    transition: 300ms transform;
  }
  &__hero.active {
    border-radius: 5px 5px 0 0;
  }
  &__hero.active img {
    transform: rotate(180deg);
  }
  &__list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    border: 2px solid#323232;
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
  &__item {
    position: relative;
    padding: 10px;

    background: #fff;
  }
  &__item.disabled {
    padding-left: 15px;
    pointer-events: none;
    color: #54ad2a;
  }
  &__item.disabled:before {
    content: '';
    display: block;
    height: 60%;
    left: 7px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    background: #54ad2a;
  }
  &__item:not(:last-child) {
    border-bottom: 2px solid#323232;
  }
}

.animate-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.animate-enter-from,
.animate-leave-to {
  opacity: 0;
  transition: opacity 0.3s ease;
}
</style>