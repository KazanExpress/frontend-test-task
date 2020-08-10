<template>
    <div>
        <div class="d-flex p-1 test" :class="{'p-2':dragging}" @dragover.prevent @drop="onDropBefore"></div>
        <div draggable="true" @dragover.prevent @dragend="onDragEnd" @dragstart="onDragStart" @drop="onDrop" role="button"
             class="d-flex align-items-center ml-2 mr-2 p-2 pl-3 pr-2 " :class="[dragging ? 'drag' : 'neo']" @click="click">
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
        <div class="d-flex p-1 test" :class="{'p-2':dragging}" @dragover.prevent @drop="onDropAfter" @click="test"></div>
    </div>
</template>

<script>
    export default {
        name: 'ToDo',
        props: ['item', 'index'],
        data: ()=>({
            dragging: false
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
            test() {
                alert('zone')
            },
            onDrop(e) {
                const index = e
                    .dataTransfer
                    .getData('text')
                this.$store.commit('dropInto', {target: this.index, drop: index})
                this.$store.commit('updateItems')
            },
            onDropBefore(e) {
                const index = e
                    .dataTransfer
                    .getData('text')
                this.$store.commit('dropBefore', {target: this.index, drop: index})
                this.$store.commit('updateItems')
            },
            onDropAfter(e) {
                const index = e
                    .dataTransfer
                    .getData('text')
                this.$store.commit('dropBefore', {target: this.index+1, drop: index})
                this.$store.commit('updateItems')
            },
            onDragStart(e) {
                e.dataTransfer.setData('text/plain', this.index)
                this.dragging = true
                this.$parent.$parent.$emit('dragFlag', true) // for back button
            },
            onDragEnd(e) {
                this.dragging = false
                this.$parent.$parent.$emit('dragFlag', false) // for back button
            },
            click() {
                this.$store.commit('goTo', this.index)
                this.$store.commit('updateRoot')
            },
            remove() {
                this.$store.commit('deleteItem', {id: this.index})
                this.$store.commit('updateItems')
            },
            close() {
                this.$store.commit('closeItem', {id: this.index, root: this.root})
                this.$store.commit('updateItems')
            }
        }
    }
</script>

