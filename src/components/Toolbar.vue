<template>
  <div class="toolbar_wrap">
    <div class="title_wrap wrap">
      <h4 contenteditable @focusout="onFocusOut">{{Tabs.appName}}</h4>
      <h4>:{{Tabs.appID}}</h4>

    </div>
    <div class="search_wrap wrap">
      <input type="text" class="search">
    </div>
    <div class="buttons_wrap wrap">
      <fileDownloadIcon class="icon_button" :size="30"/>
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
    fileDownloadIcon, fileUploadIcon
  },
  data: () => {
    return {}
  },
  computed: {
    ...mapState(['Tabs'])
  },
  mounted () {
  },
  methods: {
    onFocusOut (e) {
      this.Tabs.setAppName(e.target.innerText)
    },
  }
}
</script>
