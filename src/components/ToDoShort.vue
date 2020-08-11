<template>
    <div>
        <div class="d-flex transition p-1" :class="{'p-4': dragBefore}" @dragleave.prevent="dragBefore=false"
             @dragover.prevent="dragBefore=true" @drop="onDropBefore"></div>
        <div :draggable="$store.getters.inSearch" @dragover.prevent.capture="dragSelf=true"
             @dragleave.prevent.capture="dragSelf=false"
             @dragend="onDragEnd" @dragstart="onDragStart"
             @drop="onDrop"
             role="button"
             class="d-flex align-items-center ml-2 mr-2 p-2 pl-3 pr-2 "
             :class="[dragging ? 'drag pl-4' : 'neo',{'add': dragSelf}]"
             @click="click">
            <div v-if="!dragging" class=" mr-1" @click.stop="close">
                <svg width="1.5em"
                     height="1.5em"
                     viewBox="0 0 16 16"
                     class="bi bi-check2"
                     :fill="color">
                    <path fill-rule="evenodd"
                          d="M13.854 3.646a.5.5 0 0
                           1 0 .708l-7 7a.5.5 0 0 1-.708
                           0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5
                            10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
            </div>
            <div class="size ml-2">
                {{item.text}}
            </div>
            <div v-if="!dragging" class="ml-auto" @click.stop="remove">
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x" fill="red"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd"
                          d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                </svg>
            </div>
        </div>
        <div class="d-flex transition p-1" :class="{'p-4': dragAfter}" @dragleave.prevent="dragAfter=false"
             @dragover.prevent="dragAfter=true" @drop="onDropAfter"></div>
    </div>
</template>

<script>
    import colorMixin from '../mixins/colorMixin'

    /**
     * Represents a quick view item
     * @vue-prop {Object} item - current item
     * @vue-prop {Integer} index - index of current item in parent.children
     * @vue-data {Boolean} dragging - true when dragging this item
     * @vue-data {Boolean} dragBefore - true when drag over before space
     * @vue-data {Boolean} dragging - true when drag over after space
     * @vue-data {Boolean} dragSelf - true when drag over this item
     * @vue-event {Void} onDrop - handler for drop into this item
     * @vue-event {Void} onDropSide - handler for drop into side
     * @vue-event {Void} onDropBefore - emit onDropSide
     * @vue-event {Void} onDropAfter - emit onDropSide
     * @vue-event {Void} onDragStart - handler for dragstart; set index into dataTransfer
     * @vue-event {Void} onDragEnd - handler for dragend
     * @vue-event {Void} click - move to next item
     * @vue-event {Void} remove - remove item by index
     * @vue-event {Void} close - toggle close flag
     */
    export default {
        name: 'ToDo',
        mixins: [colorMixin],
        props: ['item', 'index'],
        data: () => ({
            dragging: false, // all flags need for css classes
            dragBefore: false,
            dragAfter: false,
            dragSelf: false
        }),
        methods: {
            onDrop(e) {
                this.dragSelf = false
                const index = e
                    .dataTransfer
                    .getData('text')
                if (+index !== +this.index) {
                    this.$store.dispatch('dropInto', {target: this.index, drop: index})
                    this.$eventHub.$emit('alert', 'moved inward')
                }
            },
            onDropSide(e, isAfter) {
                const index = e
                    .dataTransfer
                    .getData('text')
                this.$store.dispatch('dropSide', {target: this.index, drop: index, isAfter: isAfter})
            },
            onDropBefore(e) {
                this.dragBefore = false
                this.onDropSide(e, false)
            },
            onDropAfter(e) {
                this.dragAfter = false
                this.onDropSide(e, true)
            },
            onDragStart(e) {
                e.dataTransfer.setData('text/plain', this.index)
                this.dragging = true
                this.$store.commit('onDrag', true) // for back button
            },
            onDragEnd() {
                this.dragging = false
                this.$store.commit('onDrag', false) // for back button
            },
            click(e) {
                e.target.blur()
                this.$store.dispatch('goTo', this.index)
            },
            remove() {
                this.$store.dispatch('deleteItem', this.index)
            },
            close() {
                this.$store.dispatch('closeItem', this.index)
            }
        }
    }
</script>

