<template>
<!--    <div class="input-group input-group-lg col-12 p-0">-->
<!--        <input v-model="descriptionText" type="text" class="form-control">-->
<!--        <div class="input-group-append">-->
<!--        </div>-->
<!--    </div>-->

    <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">mode_edit</i>
                    <textarea v-model="descriptionText" id="icon_prefix2" class="materialize-textarea"></textarea>
                    <label for="icon_prefix2"></label>
                </div>
            </div>
            <button type="button" class="btn waves-effect waves-light" @click="$emit('saveEmitter')">
                <i class="material-icons right">save</i>Сохранить</button>

        </form>
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
    .btn {
        background-color: #42b983;
        box-shadow: none;
        -webkit-box-shadow: none;

    }
    .btn:hover {
        background-color: #6eb796;
    }
    .row .col.s6 {
        width: 100%;
        margin-left: auto;
        left: auto;
        right: auto;
    }
    textarea.materialize-textarea:focus:not([readonly]) {
        border-bottom: 1px solid #feca57;
        -webkit-box-shadow: 0 1px 0 0 #26a69a;
        box-shadow: 0 1px 0 0 #feca57;
    }
</style>
