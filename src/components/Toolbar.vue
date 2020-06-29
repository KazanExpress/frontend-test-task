<template>
  <div class="toolbar_wrap">
    <div class="title_wrap">
      <span contenteditable @focusout="onFocusOut">{{Tabs.appName}}</span>
      <span>:{{Tabs.appID}}</span>

    </div>
    <div class="search_wrap">
      <input type="text" class="search">
    </div>
    <div class="buttons_wrap">
      <button>1</button>
      <button>2</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
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
