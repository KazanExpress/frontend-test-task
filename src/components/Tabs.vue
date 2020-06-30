<template>
  <div class="tabscomponent_wrap">
    <div class="panel">
      <div class="header_tabs">
        Другие вкладки
      </div>
      <div class="tabs_list_wrap">
        <div class="tabs_item" v-for="Tab in Tabs.tabs" :key="Tab.appID">
          <Drop :data-tabsid="Tab.appID" @drop="dropEnd">
            <div class="item_status">
            </div>
            <div class="item_title">
              {{Tab.appName}} : {{Tab.appID}}
            </div>
          </Drop>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import { Drop } from 'vue-easy-dnd';

  export default {
    components:{
      Drop
    },
    data: () => {
      return {};
    },
    computed: {
      ...mapState(['Tabs', 'TasksList']),
    },
    methods: {
      dropEnd(e){
        let targetTab = e.top.$el.dataset.tabsid
        this.Tabs.sendDataToTab(targetTab, e.data)
      }
    },
    beforeMount() {
      this.Tabs.assignStore(this.$store)
    },
    mounted() {
      this.Tabs.getDataFromTabs();
    }

  };
</script>
