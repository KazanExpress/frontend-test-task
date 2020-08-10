<template>
    <div  class="neo m-2 p-3 position-relative">
        <div class="d-flex justify-content-between" v-if="$store.getters.getRoot.length">
            <div @click.stop="close">
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
            <div @click.stop="remove">
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x" fill="red"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd"
                          d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                </svg>
            </div>
        </div>
        <textarea @input="change" @paste.stop @copy.stop  rows="3"
                  v-if="this.$store.getters.getRoot.length"
                  v-model="item.text"
                  class="input textarea w-100 m-1 pl-2 pr-2 pb-3"/>
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
                this.$store.commit('updateItems', this.$store.getters.getRoot)
            },
            remove: function() {
                console.log('delete self')
                this.$store.commit('deleteSelf')
                this.$store.commit('updateItems')
                this.$store.commit('updateRoot')
            },
            close: function() {
                this.$store.commit('closeSelf')
                this.$store.commit('updateItems')
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
                return this.$store.getters.getItemByRoot
            }
        }
    }
</script>
<style>
    .textarea {
        font-size: 20px;
    }
</style>

