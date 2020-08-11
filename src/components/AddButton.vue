<template>
    <div>
        <div class="d-flex neo box btn add" :class="className">
            <input @copy.stop @paste.stop @cut.stop @keypress.enter.stop="clickAndClean" v-model="addText" type="text"
                   :placeholder="placeholder" class="container-fluid ml-3 input">
            <div @click.stop="clickAndClean">
                <icon><icon-plus/></icon>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from './Icon'
    import IconPlus from '../icons/IconPlus'
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
        components: {Icon, IconPlus},
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
