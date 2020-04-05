<template>
    <div class="search-wrapper">
        <input
                type="text"
                :class="this.index"
                v-model="searchText"
                placeholder="Поиск"
                @blur="searchBlur"
        >
    </div>
</template>

<script>
    import { bus } from '../store/bus.js'

    export default {
        name: "SearchFilter",
        props: {
            index: Number
        },
        data() {
            return {
                searchText: ''
            }
        },

        watch: {
            searchText(text) {
                this.$emit("searchText", text)
            }
        },

        created() {
            bus.$on("searchLast", (data)=> {
                this.searchText = data.word
            })
        },

        methods: {
            searchBlur(event) {
                if(this.searchText[this.index]) {
                    this.$emit("searchBlur", event)
                }
            }
        }
    }
</script>

<style scoped lang="sass">
    .search-wrapper
        display: flex
        flex-direction: column
</style>
