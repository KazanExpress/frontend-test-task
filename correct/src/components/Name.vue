<template>
    <input @input="change" class="w-100 input text-center name mx-auto" :value="name">
</template>

<script>
    /**
     * Represents a input of project's name
     * @vue-computed {String} name - represent name (page title) of project
     * @vue-event {Void} change - handler for @input: updates name
     */
    export default {
        name: 'Name',
        computed: {
            name() {
                return this.$store.state.name
            }
        },
        methods: {
            change(e) {
                this.$store.dispatch('setName', e.target.value)
            }
        }
    }
</script>

