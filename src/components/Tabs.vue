<template>
  <div class="tabscomponent_wrap">
    <div class="panel">
      <div class="header_tabs">
        Другие вкладки
      </div>
      <div class="tabs_list_wrap">
        <div class="tabs_item" v-for="Tab in Tabs.tabs" :key="Tab.appID">
          <div class="item_status">
          </div>
          <div class="item_title">
            {{Tab.appName}} : {{Tab.appID}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';

export default {

  data: () => {
    return {}
  },
  computed: {
    ...mapState(['Tabs', 'TasksList'])
  },

}
</script>
