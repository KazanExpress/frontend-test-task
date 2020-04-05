<template>
    <button
            type="button"
            class="btn btn--save"
            @click="exportFile()"
    >
        Скачать проект
    </button>
</template>

<script>
    import {mapGetters, mapState} from "vuex";

    export default {
        name: "Export",
        computed: {
            ...mapState('data', ['projectList']),
            ...mapGetters('data', ['getMainTitle'])
        },
        methods: {
            exportFile() {
                let data = sessionStorage.getItem('store')
                let filename = `${this.getMainTitle}.json`

                if(!data) {
                    console.error('Console.save: No data')
                    return;
                }

                if(!filename) filename = 'default.json'

                if(typeof data === "object"){
                    data = JSON.stringify(data, undefined, 4)
                }

                var blob = new Blob([data], {type: 'text/json'}),
                    e    = document.createEvent('MouseEvents'),
                    a    = document.createElement('a')

                a.download = filename
                a.href = window.URL.createObjectURL(blob)
                a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
                e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                a.dispatchEvent(e)
            }
        }
    }
</script>

<style scoped>

</style>
