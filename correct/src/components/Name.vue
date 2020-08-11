<template>
        <input @input="change" class="w-100 input text-center name mx-auto  " :value="name">
</template>

<script>
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

