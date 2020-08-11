<template>
    <div role="button" @click="click" class="d-flex m-2 neo box add position-relative"
         :class="{'select': tag.selected}">
        <div class="m-0 ml-2 mr-2">
            {{tag.text}}
        </div>
        <div role="button" v-if="tag.type!=='init'" @click.stop="remove">
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="m-0 p-0" fill="red">
                <path fill-rule="evenodd"
                      d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                <path fill-rule="evenodd"
                      d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
            </svg>
        </div>
    </div>
</template>

<script>
    /**
     * Represents a filter-tag for searching
     * @vue-prop {Object} tag - object with information about filter
     * @vue-index {Integer} index - index of filter in filter's array
     * @vue-event {Void} remove - remove filter by index
     * @vue-event {Void} click - toggle select of filter
     */
    export default {
        name: 'Tag',
        props: ['tag', 'index'],
        methods: {
            remove() {
                this.$store.dispatch('deleteFilter', this.index)
            },
            click() {
                this.$store.dispatch('toggleFilter', this.index)
            }
        }
    }
</script>

