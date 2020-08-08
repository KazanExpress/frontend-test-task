<template>
        <input @input="change" class="w-100 input text-center name mx-auto  " :value="name">
</template>

<script>
    export default {
        name: 'Name',
        computed: {
            name: function() {
                return this.$store.getters.getName
            }
        },
        methods: {
            change: function(e) {
                this.$store.commit('setName', e.target.value)
                this.$store.commit('updateName')
            }
        }
    }
</script>

