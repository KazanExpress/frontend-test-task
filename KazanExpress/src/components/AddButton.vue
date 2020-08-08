<template>
    <div>
        <div class=" d-flex align-items-center neo btn add m-2 p-2 pl-3" >
            <input @copy.stop @paste.stop @keypress="keyPressHandler" v-model="addText" type="text" placeholder="new todo" class="container-fluid input">
            <div @click.stop="add">
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-plus " fill="green">
                <path fill-rule="evenodd"
                      d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
            </svg>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AddButton',
        data: () => ({
            isShow: false,
            addText: ''
        }),
        methods: {
            keyPressHandler(e) {
                if (e.key=== 'Enter' || e.keyCode === 13) { // for any browsers
                    this.add()
                    return false
                }
            },
            add: function() {
                this.$store.commit('addItem', {text: this.addText, closed: false, children: []})
                this.$store.commit('updateItems')
                this.addText=''
            }
        }
    }
</script>

<style scoped>

</style>
