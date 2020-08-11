<template>
    <div @keydown.ctrl.66.prevent.stop.capture="download"
         @keydown.meta.66.prevent.stop.capture="download"
         @copy.prevent="copy"
         @paste.prevent="paste"
         class="container-sm p-4" style="max-width: 50em">
        <Alert/>
        <div v-if="inStart" class="mt-3">
            <Name/>
        </div>
        <button @dragover.prevent="dragBack=true"
                @dragleave="dragBack=false" @drop="onDropBack"
                class="btn m-2 transition neo"
                :class="[$store.state.onDrag?'pl-5 pr-5':'',{'add': dragBack}]"
                v-else @click="back">
            <icon :width="'2em'" :height="'2em'">
                <icon-back/>
            </icon>
        </button>
        <ToDo/>
        <div class="transition" :class="{'hidden':$store.state.onDrag}">
            <Import v-if="inStart"/>
            <div class="mt-5 d-flex justify-content-around">
                <div v-if="inStart" role="button" @click="download"
                     class="text-center">
                    <icon :width="'2em'" :height="'2em'" :icon-color="'black'" :class-name="'m-2'">
                        <icon-export/>
                    </icon>
                    <div>Download this .todo file</div>
                </div>
                <div v-if="!inStart" role="button" @click="cut" class="text-center">
                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="m-2" fill="currentColor">
                        <path fill-rule="evenodd"
                              d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                        <path fill-rule="evenodd"
                              d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3zm-1 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    <div>
                        <p class="m-0 p-0">
                            Cut this todo item
                        </p>
                        <small>to paste use hot key</small>
                    </div>
                </div>
                <div role="button" @click="copy" class="text-center">
                    <icon :width="'2em'" :height="'2em'" :icon-color="'black'" :class-name="'m-2'">
                        <icon-copy/>
                    </icon>
                    <div>
                        <p class="m-0 p-0">
                            Copy this todo item
                        </p>
                        <small>to paste use hot key</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ToDo from '../components/ToDo'
    import Name from '../components/Name'
    import Import from '../components/Import'
    import Alert from '../components/Alert'
    import Icon from '../components/Icon'
    import IconExport from '../icons/IconExport'
    import IconCopy from '../icons/IconCopy'
    import IconBack from '../icons/IconBack'

    /**
     * Represents a single view
     * @vue-data {Boolean} dragBack - true when drag over back button
     * @vue-computed {String} name - return current name, need to set document.title
     * @vue-computed {Boolean} inStart - true when root=[]
     * @vue-event {Void} cut - handler for cut event
     * @vue-event {Void} copy - handler for copy event
     * @vue-event {Void} paste - handler for paste event
     * @vue-event {Void} onDropBack - handler for drop event into back button
     * @vue-event {Void} back - handler for click back button; move back
     * @vue-event {Void} download - emit download function
     */
    export default {
        name: 'Project',
        components: {Alert, ToDo, Name, Import, Icon, IconExport, IconCopy, IconBack},
        data: () => ({
            dragBack: false,
        }),
        computed: {
            name() {
                return this.$store.state.name
            },
            inStart() {
                return this.$store.getters.inStart
            }
        },
        watch: {
            name() {
                document.title = this.name // updating document.title to name of project
            }
        },
        methods: {
            cut() { // copy and delete self
                this.copy()
                this.$store.dispatch('deleteSelf')
                this.$eventHub.$emit('alert', 'cut to clipboard')
            },
            copy() {
                const item = this.$store.getters.getCurrent
                if (item.text === '') {
                    item.text = this.$store.state.name
                }
                const content = JSON.stringify(item)
                this.$clipboard(content) // set to clipboardData JSON of object; idk, but in 50% cases set ''
                this.$eventHub.$emit('alert', 'copied to clipboard')
            },
            paste(e) {
                let message = 'pasted successfully' // need for alert message
                const data = e.clipboardData.getData('text/plain')
                try { // try to parse last clipboardData and add that object
                    const item = JSON.parse(data)
                    this.$store.dispatch('addItem', item)
                } catch (e) {
                    message = 'failed paste attempt'
                } finally {
                    this.$eventHub.$emit('alert', message)
                }
            },
            onDropBack(e) {
                this.dragBack = false
                const index = e // get index from transfer data
                    .dataTransfer
                    .getData('text/plain')
                this.$store.dispatch('dropBack', {drop: index})
                this.$eventHub.$emit('alert', 'moved back')
            },
            back() {
                this.$store.dispatch('back')
            },
            download() {
                this.$store.dispatch('export')
                this.$eventHub.$emit('alert', '.todo file was downloaded')
            }
        },
        mounted() {
            document.title = this.name // initialize title
        }
    }
</script>
