<template>
  <div
    class="modal"
    :class="{ 'modal-active': getActiveModal }"
    @click="CLOSE_MODAL"
  >
    <div
      class="modal__content"
      :class="{ 'modal__content-active': getActiveModal }"
      @click.stop
    >
      <span class="modal__close" @click="CLOSE_MODAL">
        <img src="../../assets/icon-close.svg" alt="" />
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<script  lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
export default defineComponent({
  computed: {
    ...mapGetters(['getActiveModal']),
  },
  methods: {
    ...mapMutations(['CLOSE_MODAL']),
  },
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  height: 100%;
  width: 100%;
  background-color: rgba(1, 1, 1, 0.7);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
  padding: 100px 100px;
  overflow: auto;
  text-align: center;
  &::before {
    content: '';
    display: inline-block;
    font-size: 0;
    height: 100%;
    vertical-align: middle;
    width: 0;
  }
  &-active {
    opacity: 1;
    pointer-events: all;
  }
  &__content {
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 500px;
    padding: 60px 30px 30px 30px;
    border-radius: 20px;
    background-color: white;
    transform: scale(0.5);
    transition: transform 0.4s ease;
    vertical-align: middle;
    text-align: left;
  }
  &__content-active {
    transform: scale(1);
  }
  &__close {
    position: absolute;
    display: inline-block;
    right: 5px;
    top: 5px;
    padding: 15px;
    cursor: pointer;
  }
  &__close img {
    width: 25px;
  }
}
</style>