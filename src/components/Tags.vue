<template>
    <div class="d-flex flex-wrap mb-3 pl-1 pr-1">
        <AddButton :class-name="'p-0 m-2'" :placeholder="'add RegEx without /'" :click-function="add"/>
        <Tag v-for="(tag,index) in filters" :index="index" :key="index+'f'" :tag="tag"/>
    </div>
</template>

<script>
    import Tag from './Tag'
    import AddButton from './AddButton'

    /**
     * Represents a list of filters with add button
     * @vue-computed {Array} filters - array of filters from state
     * @vue-event {Void} add - clickFunction for add button
     */
    export default {
        name: 'Tags',
        components: {AddButton, Tag},
        computed: {
            filters() {
                return this.$store.state.filters
            }
        },
        methods: {
            add(text) {
                this.$store.dispatch('addRegex', text)
            }
        }
    }
</script>
