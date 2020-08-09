<template>
    <div class="d-flex flex-wrap mb-3 pl-1 pr-1">
        <AddButton :class-name="'p-0'" :placeholder="'add RegEx without /'" :click-function="add" />
        <Tag v-for="(tag,index) in filters" :index="index" :key="index+'f'" :tag="tag"/>
    </div>
</template>

<script>
    import Tag from './Tag'
    import AddButton from './AddButton'
    export default {
        name: 'Tags',
        components: {AddButton, Tag},
        computed: {
            filters() {
                return this.$store.getters.getFilters
            }
        },
        methods: {
            add(text) {
                this.$store.commit('addRegex', text)
                this.$store.commit('updateFilters')
            }
        }
    }
</script>

<style scoped>

</style>
