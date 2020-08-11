<template>
    <div>
        <div class="d-flex transition p-1" :class="{'p-3': dragBefore}" @dragleave.prevent="dragBefore=false"
             @dragover.prevent="dragBefore=true" @drop="onDropBefore"></div>
        <div :draggable="$store.getters.inSearch" @dragover.prevent.capture="dragSelf=true" @dragleave.prevent.capture="dragSelf=false"
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
        <div class="d-flex transition p-1" :class="{'p-3': dragAfter}" @dragleave.prevent="dragAfter=false"
             @dragover.prevent="dragAfter=true" @drop="onDropAfter"></div>
    </div>
</template>

<script>
    export default {
        name: 'ToDo',
        props: ['item', 'index'],
        data: () => ({
            dragging: false,
            dragBefore: false,
            dragAfter: false,
            dragSelf: false
        }),
        computed: {
            color() {
                if (this.item.closed) {
                    return 'green'
                } else {
                    return 'grey'
                }
            }
        },
        methods: {
            onDrop(e) {
                this.dragSelf = false
                const index = e
                    .dataTransfer
                    .getData('text')
                this.$store.dispatch('dropInto', {target: this.index, drop: index})
                this.$eventHub.$emit('alert', 'moved inward')
            },
            onDropBefore(e) {
                this.dragBefore = false
                const index = e
                    .dataTransfer
                    .getData('text')
                this.$store.dispatch('dropSide', {target: this.index, drop: index, isAfter: false})
            },
            onDropAfter(e) {
                this.dragAfter = false
                const index = e
                    .dataTransfer
                    .getData('text')
                this.$store.dispatch('dropSide', {target: this.index, drop: index, isAfter: true})
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
            click() {
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

