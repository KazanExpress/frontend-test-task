<template>
  <div class="toolbar_wrap">
    <div class="title_wrap wrap">
      <h4 contenteditable @focusout="onFocusOut" class="appTitle" spellcheck="false" @keypress.enter.prevent>
        {{Tabs.appName}}</h4>
      <h4>:{{Tabs.appID}}</h4>

    </div>
    <div class="search_wrap">
      <autocomplete :search="search" @change="onChange" @submit="onSubmit"></autocomplete>
    </div>
    <div class="buttons_wrap wrap">
      <fileDownloadIcon class="icon_button" @click="makeFileAndDownload" :size="30"/>
      <label class="custom-file-upload"><input type="file" id="input" @change="fileEdit"><fileUploadIcon class="icon_button" :size="30"></fileUploadIcon></label>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex';
  import fileDownloadIcon from 'vue-material-design-icons/FileDownloadOutline.vue';
  import fileUploadIcon from 'vue-material-design-icons/FileUploadOutline.vue';
  import Autocomplete from '@trevoreyre/autocomplete-vue';
  import '@trevoreyre/autocomplete-vue/dist/style.css';

  export default {
    components: {
      fileDownloadIcon, fileUploadIcon, Autocomplete,
    },
    data: () => {
      return {
        filterValue: '',
        filterList: [],

      };
    },
    computed: {
      ...mapState(['Tabs']), ...mapGetters(['getFilterArray', 'getTasks'])
    },
    mounted() {
      this.filterList = this.getFilterArray;
    },
    methods: {
      onFocusOut(e) {
        this.Tabs.setAppName(e.target.innerText);
        e.target.blur();
      },

      search(input) {
        this.filterValue = input;
        this.$store.commit('setFilter', this.filterValue);
        return this.filterList;
      },
      onSubmit(value) {
        if (value) this.filterValue = value;
        this.$store.commit('setFilter', this.filterValue);
      },
      onChange(){
        if (this.filterValue.trim().length > 2) {
          this.filterList.push(this.filterValue.trim());
          this.$store.commit('addFilterInSS', this.filterValue.trim());
        }
      },


      makeFileAndDownload(){
        let text = JSON.stringify(this.getTasks);
        let filename = `${this.Tabs.appName+this.Tabs.appID}.json`;
        download(filename, text);
        function download(filename, text) {
          let element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
          element.setAttribute('download', filename);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }
      },
      fileEdit(){
        const selectedFile = document.getElementById('input').files[0];
        let filereader = new FileReader()
        filereader.readAsText(selectedFile);
        filereader.onload = (e) => {


          if (/^[\],:{}\s]*$/.test(e.target.result.replace(/\\["\\\/bfnrtu]/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            this.$store.commit('tasksListFromFile', JSON.parse(e.target.result))
            console.log('json ok');
          }else{
            console.log('json not ok');
          }
        }
      },





    },
  };
</script>
<style>

</style>
