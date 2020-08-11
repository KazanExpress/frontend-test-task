<template>
    <div class="m-2 mt-5" v-cloak @drop.prevent="dropLoad" @dragover.prevent>
        <label class="box p-5 container-fluid text-center text-reader mx-auto">
            <p class="m-0 p-0">
                <icon :icon-color="'black'" :height="'2em'" :width="'2em'">
                    <icon-import/>
                </icon>
            </p>
            Drop your .todo file to this zone
            <input type="file" @change="clickLoad">
        </label>
    </div>
</template>

<script>
    import Icon from './Icon'
    import IconImport from '../icons/IconImport'

    /**
     * Represents a drop-zone for export
     * @vue-event {Void} clearInput - clear input.files and input.value for reuse
     * @vue-event {Void} clickLoad - emit load function and clear input
     * @vue-event {Void} dropLoad - emit load function and clear input
     * @vue-event {Void} load - try load file and update state
     */
    export default {
        name: 'Import',
        components: {Icon, IconImport},
        methods: {
            clearInput(input) { // need for reuse component
                input.files = null
                input.value = null
            },
            clickLoad(e) {
                this.load(e.target.files[0])
                this.clearInput(e.target)
            },
            dropLoad(e) {
                this.load(e.dataTransfer.files[0])
                this.clearInput(e.target)
            },
            load(file) {
                let message = '.todo file loaded successfully'
                const reader = new FileReader()
                reader.onload = e => {
                    this.$store.dispatch('import', {
                        data: JSON.parse(e.target.result),
                        name: file.name.split('.').slice(0, -1).join('.') // without extension
                    })
                }
                try {
                    reader.readAsText(file)
                } catch (e) {
                    message = 'failed load attempt'
                } finally {
                    this.$eventHub.$emit('alert', message)
                }
            }
        }
    }
</script>

<style scoped>
    .box {
        border: 1px black dashed;
        border-radius: 26px;
    }

    .text-reader {
        position: relative;
        overflow: hidden;
        display: inline-block;
        cursor: pointer;
    }

    .text-reader input {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0;
    }
</style>
