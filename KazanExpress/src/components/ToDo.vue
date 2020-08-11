<template>
    <div  class="neo m-2 p-3 position-relative">
        <div class="d-flex justify-content-between" v-if="$store.state.root.length">
            <div role="button" @click.stop="close">
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
            <div role="button" @click.stop="remove">
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x" fill="red"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd"
                          d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                </svg>
            </div>
        </div>
        <textarea :disabled="$store.state.onDrag" @input="change" @paste.stop @copy.stop  rows="2"
                  v-if="this.$store.state.root.length"
                  v-model="item.text"
                  class="input transition textarea w-100 m-1 pl-2 pr-2 pb-3"/>
        <ToDoList  :children="item.children"/>
    </div>
</template>

<script>
    import ToDoList from './ToDoList'

    export default {
        name: 'ToDo',
        components: {ToDoList},
        methods: {
            change() {
                this.$store.commit('updateItems')
            },
            remove: function() {
                this.$store.dispatch('deleteSelf')
                this.$eventHub.$emit('alert', 'item was deleted')
            },
            close: function() {
                this.$store.dispatch('closeSelf')
            }
        },
        computed: {
            color: function() {
                if (this.item.closed) {
                    return 'green'
                } else {
                    return 'grey'
                }
            },
            item: function() {
                return this.$store.getters.getCurrent
            }
        }
    }
</script>
<style>
    .textarea {
        font-size: 20px;
    }
</style>

