<template>
  <div class="toolbar_wrap">
    <div class="title_wrap wrap">
      <h4 contenteditable @focusout="onFocusOut" class="appTitle" spellcheck="false" @keypress.enter.prevent>{{Tabs.appName}}</h4>
      <h4>:{{Tabs.appID}}</h4>

    </div>
    <div class="search_wrap wrap">
      <input spellcheck="false" type="text" class="search" v-model="filterValue" @input="filterChange">
    </div>
    <div class="buttons_wrap wrap">
      <fileDownloadIcon class="icon_button" @click="show" :size="30"/>
      <fileUploadIcon class="icon_button" :size="30"/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import fileDownloadIcon  from 'vue-material-design-icons/FileDownloadOutline.vue'
import fileUploadIcon  from 'vue-material-design-icons/FileUploadOutline.vue'


export default {
  components: {
    fileDownloadIcon, fileUploadIcon,
  },
  data: () => {
    return {
      filterValue: ''
    }
  },
  computed: {
    ...mapState(['Tabs'])
  },
  mounted () {
  },
  methods: {
    onFocusOut (e) {
      this.Tabs.setAppName(e.target.innerText)
      e.target.blur();
    },
    show () {
      this.$modal.show('demo-login');
    },
    hide () {
      this.$modal.hide('hello-world');
    },
    filterChange(){
      this.$store.commit('setFilter', this.filterValue)
    }

  }
}
</script>
