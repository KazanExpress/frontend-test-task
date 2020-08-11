<template>
    <div>
        <div class="d-flex neo box btn add" :class="className">
            <input @copy.stop @paste.stop @cut.stop @keypress.enter="clickAndClean" v-model="addText" type="text"
                   :placeholder="placeholder" class="container-fluid ml-3 input">
            <div @click.stop="clickAndClean">
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
    /**
     * Represents a form with input and click(enter press) action
     * @vue-prop {String} className - string of css classes
     * @vue-prop {String} placeholder - placeholder to input
     * @vue-prop {Function} clickFunction - function to be executed by click
     * @vue-data {String} addText - text in input
     * @vue-event {Void} clickAndClean - Emit clickFunction after check for empty addText and clean addText
     */
    export default {
        name: 'AddButton',
        props: ['className', 'placeholder', 'clickFunction'],
        data: () => ({
            addText: ''
        }),
        methods: {
            clickAndClean() {
                if (this.addText !== '') { // ignore empty input
                    this.clickFunction(this.addText)
                    this.addText = ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
