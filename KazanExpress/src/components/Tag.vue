<template>
    <div role="button" @click="click" class="d-flex m-2 neo box add position-relative" :class="{'select': tag.selected}">
        <div class="m-0 ml-2 mr-2">
            {{tag.text}}
        </div>
        <div role="button" v-if="tag.type!=='init'" @click.stop="remove">
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="m-0 p-0" fill="red"
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
    .vertical-center {
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
</style>
