<template>
    <div tabindex="0" role="button" @click="click" @keypress.delete.self.stop="remove" @keypress.enter.self.stop="click"
         class="d-flex m-2 neo box add position-relative"
         :class="{'select': tag.selected}">
        <div class="m-0 ml-2 mr-2">
            {{tag.text}}
        </div>
        <div role="button" v-if="tag.type!=='init'" @click.stop="remove">
            <icon :icon-color="'red'" :class-name="'m-0 p-0'">
                <icon-x/>
            </icon>
        </div>
    </div>
</template>

<script>
    import Icon from './Icon'
    import IconX from '../icons/IconX'

    /**
     * Represents a filter-tag for searching
     * @vue-prop {Object} tag - object with information about filter
     * @vue-index {Integer} index - index of filter in filter's array
     * @vue-event {Void} remove - remove filter by index
     * @vue-event {Void} click - toggle select of filter
     */
    export default {
        name: 'Tag',
        components: {Icon, IconX},
        props: ['tag', 'index'],
        methods: {
            remove() {
                if (this.tag.type !== 'init') {
                    this.$store.dispatch('deleteFilter', this.index)
                }
            },
            click() {
                this.$store.dispatch('toggleFilter', this.index)
            }
        }
    }
</script>

