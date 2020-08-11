<template>
    <Project/>
</template>
<script>
    import Project from './views/Project'

    export default {
        components: {Project},
        methods: {
            async accept() {
                this.showUpgradeUI = false
                await this.$workbox.messageSW({type: 'SKIP_WAITING'})
            }
        },
        created() {
            if (this.$workbox) {
                this.$workbox.addEventListener('waiting', () => {
                    this.showUpgradeUI = true
                })
            }
        }
    }
</script>
<style>
    @import "../public/style.css";
</style>
