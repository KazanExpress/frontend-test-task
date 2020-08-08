<template>
    <div role="button" class="d-flex align-items-center neo m-2 p-2 pl-3 pr-2" @click="click">

        <div class=" mr-1" @click.stop="close">
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
        <div class="ml-auto" @click.stop="remove">
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x" fill="red"
                 xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                <path fill-rule="evenodd"
                      d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ToDo',
        props: ['item', 'index'],
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
