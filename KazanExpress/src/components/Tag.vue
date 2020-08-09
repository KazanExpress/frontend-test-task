<template>
    <div role="button" @click.self="click" class="d-flex m-2 align-items-center p-0 pl-1 pr-1 neo add" :class="{'select': tag.selected}">
        {{tag.text}}
        <div role="button" v-if="tag.type!=='init'" @click.stop="remove">
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x m-0" fill="red"
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
        name: 'Tag',
        props: ['tag', 'index'],
        methods: {
            remove() {
                this.$store.commit('deleteFilter', this.index)
                this.$store.commit('updateFilters')
            },
            click() {
                this.$store.commit('toggleFilter', this.index)
                this.$store.commit('updateFilters')
            }
        }
    }
</script>

<style scoped>

</style>
