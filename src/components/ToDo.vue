<template>
    <div @copy.prevent class="neo m-2 p-3 position-relative">
        <div class="d-flex justify-content-between" v-if="!inStart">
            <div role="button" @click.stop="close">
                <icon :height="'2em'" :width="'2em'" :icon-color="color">
                    <icon-v/>
                </icon>
            </div>
            <div role="button" @click.stop="remove">
                <icon :height="'2em'" :width="'2em'" :icon-color="'red'">
                    <icon-x/>
                </icon>
            </div>
        </div>
        <textarea placeholder="Your todo" :disabled="$store.state.onDrag" @input="change" @paste.stop @copy.stop rows="2"
                  v-if="!inStart"
                  v-model="item.text"
                  class="input transition textarea w-100 m-1 pl-2 pr-2 pb-3"/>
        <ToDoList :children="item.children"/>
    </div>
</template>

<script>
    import ToDoList from './ToDoList'
    import colorMixin from '../mixins/colorMixin'
    import Icon from './Icon'
    import IconV from '../icons/IconV'
    import IconX from '../icons/IconX'

    /**
     * Represents a full view item
     * @vue-computed {Object} item - return current item
     * @vue-event {Void} change - handler for textarea update event
     * @vue-event {Void} remove - handler for delete self
     * @vue-event {Void} close - handler for close self
     */
    export default {
        name: 'ToDo',
        mixins: [colorMixin],
        components: {ToDoList, Icon, IconV, IconX},
        computed: {
            item() {
                return this.$store.getters.getCurrent
            },
            inStart() {
                return this.$store.getters.inStart
            }
        },
        methods: {
            change() {
                this.$store.commit('updateItems')
            },
            remove() {
                if (!this.inStart) {
                    this.$store.dispatch('deleteSelf')
                    this.$eventHub.$emit('alert', 'item was deleted')
                }
            },
            close() {
                this.$store.dispatch('closeSelf')
            }
        }
    }
</script>
<style>
    .textarea {
        font-size: 20px;
    }
</style>

