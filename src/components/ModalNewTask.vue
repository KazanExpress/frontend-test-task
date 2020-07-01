<template>
  <modal :name="uIDTaskList+'modal'" transition="pop-out" :width="modalWidth" :focus-trap="true">

    <div class="box">
      <div class="header">
        {{headertext}}
      </div>
      <div class="input_wrap">
        <input type="text" spellcheck="false" class="taskName" autofocus v-model="taskNameValue" @keyup.enter="addNew">
      </div>
      <div class="buttons_wrap">
        <button @click="$modal.hide(uIDTaskList+'modal')"><Close :size="20"/></button>
        <button @click="addNew"><pencil-plus :size="20"/></button>
      </div>


    </div>
  </modal>
</template>
<script>
  import Close from 'vue-material-design-icons/Close.vue';
  import PencilPlus from 'vue-material-design-icons/PencilPlus.vue';

  const MODAL_WIDTH = 580
  export default {
    props: ['uIDTaskList', 'headertext'],
    components: {
      Close, PencilPlus
    },

    data() {
      return {
        modalWidth: MODAL_WIDTH,
        taskNameValue: '',
      }
    },
    created() {
      this.modalWidth =
        window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH
    },
    methods: {
      addNew() {
        this.$emit('addNew', this.taskNameValue);
        this.taskNameValue = '';
      }


    }
  }
</script>
<style lang="scss">
  .box {
    display: flex;
    background: white;
    overflow: hidden;
    height: 100%;
    width: 100%;
    flex-wrap: wrap;
    background: #E0F2F1;
    justify-content: center;



    .header{
      width: 100%;
      height: 2em;
      background: #B2DFDB;
      display: flex;
      align-items: center;
    }
    .input_wrap{
      width: 100%;
      align-self: center;

      display: flex;
      justify-content: center;
      .taskName{
        height: 2em;
        border: none;
        width: 80%;
        outline: none;
        padding:  10px !important;
        font-size: 20px;
        border-radius: 20px;



      }
    }
    .buttons_wrap{
      align-self: flex-end;
      align-content: center;


      display: flex;
      justify-content: space-around;
      padding-bottom: 20px !important;
      button{
        background: #B2DFDB;
        border: none;
        width: 130px;
        margin: 0px 10px!important;
        padding: 3px !important;
        &:hover{
          background-color: #B2DFDBBB;
        }
      }
    }

  }

  .pop-out-enter-active,
  .pop-out-leave-active {
    transition: all 0.5s;
  }
  .pop-out-enter,
  .pop-out-leave-active {
    opacity: 0;
    transform: translateY(24px);
  }
</style>
